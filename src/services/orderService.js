import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { SITE_CONFIG } from '../config/siteConfig';

/**
 * Generate Kode Pesanan Unik: WK-YYYYMMDD-XXXX
 */
export const generateOrderCode = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `WK-${year}${month}${day}-${random}`;
};

/**
 * Membuat Pesanan Baru di Database Supabase & Menyiapkan Data Konfirmasi WhatsApp
 */
export const createOrder = async ({ buyer, cartItems, totalPrice }) => {
  const orderCode = generateOrderCode();

  let savedToDatabase = false;
  let dbOrderId = null;

  if (isSupabaseConfigured) {
    try {
      // 1. Simpan order header
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            order_code: orderCode,
            buyer_name: buyer.name.trim(),
            buyer_whatsapp: buyer.whatsapp.trim(),
            unit: buyer.unit,
            asrama: buyer.asrama.trim(),
            kelas: buyer.kelas.trim(),
            total_amount: totalPrice,
            payment_status: 'menunggu_verifikasi',
            order_status: 'pending',
            payment_method: 'manual_transfer',
            notes: buyer.notes || ''
          }
        ])
        .select()
        .single();

      if (orderError) {
        console.error('[Supabase Order Error]:', orderError);
      } else if (orderData) {
        savedToDatabase = true;
        dbOrderId = orderData.id;

        // 2. Simpan order items
        const itemsToInsert = cartItems.map((item) => ({
          order_id: orderData.id,
          product_id: typeof item.id === 'number' ? item.id : null,
          product_name: item.name,
          size: item.selectedSize || 'Standard',
          variation: item.selectedVariation || 'D1',
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
          image_name: item.selectedImage || item.imgName || ''
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(itemsToInsert);

        if (itemsError) {
          console.error('[Supabase Order Items Error]:', itemsError);
        }
      }
    } catch (err) {
      console.error('[Supabase Exception on createOrder]:', err);
    }
  }

  // 3. Susun teks pesan WhatsApp resmi
  const itemsText = cartItems
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.selectedSize}, Var: ${item.selectedVariation}) x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`
    )
    .join('\n');

  const waMessage = 
`*[KONFIRMASI PESANAN — WONDERKIND FESTIVAL]*
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Halo Panitia Wonderkind Festival, saya ingin mengonfirmasi pesanan saya:

*Kode Pesanan:* ${orderCode}
*Nama Pemesan:* ${buyer.name}
*No. WhatsApp:* ${buyer.whatsapp}
*Unit DQM:* ${buyer.unit}
*Asrama / Kelas:* ${buyer.asrama} / ${buyer.kelas}

*Detail Item Pesanan:*
${itemsText}

*Total Tagihan:* Rp ${totalPrice.toLocaleString('id-ID')}

Mohon informasi nomor rekening/QRIS untuk pembayaran dan verifikasi pesanan ini. Terima kasih!`;

  const waUrl = `https://wa.me/${SITE_CONFIG.officialWhatsapp}?text=${encodeURIComponent(waMessage)}`;

  return {
    success: true,
    orderCode,
    dbOrderId,
    savedToDatabase,
    whatsappUrl: waUrl,
    whatsappMessage: waMessage
  };
};

/**
 * Cek Status Pesanan Berdasarkan Kode Pesanan (Untuk Pengunjung)
 */
export const getOrderByCode = async (orderCode) => {
  if (!isSupabaseConfigured) {
    return { data: null, error: 'Database belum terhubung' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('order_code', orderCode.trim().toUpperCase())
      .single();

    return { data, error };
  } catch (err) {
    return { data: null, error: err.message };
  }
};

/**
 * Mengambil Semua Pesanan (Untuk Admin Dashboard)
 */
export const getAllOrders = async () => {
  if (!isSupabaseConfigured) {
    return { data: [], error: 'Supabase belum dikonfigurasi' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    return { data: data || [], error };
  } catch (err) {
    return { data: [], error: err.message };
  }
};

/**
 * Update Status Pesanan & Pembayaran (Untuk Admin Dashboard)
 */
export const updateOrderStatus = async (orderId, { paymentStatus, orderStatus, notes }) => {
  if (!isSupabaseConfigured) {
    return { error: 'Supabase belum dikonfigurasi' };
  }

  const updates = { updated_at: new Date().toISOString() };
  if (paymentStatus) {
    updates.payment_status = paymentStatus;
    if (paymentStatus === 'lunas') {
      updates.verified_at = new Date().toISOString();
    }
  }
  if (orderStatus) updates.order_status = orderStatus;
  if (notes !== undefined) updates.notes = notes;

  try {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    return { data, error };
  } catch (err) {
    return { data: null, error: err.message };
  }
};
