import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { SITE_CONFIG } from '../config/siteConfig';

/**
 * Daftar Kategori Tiket Festival Resmi
 */
export const TICKET_PACKAGES = [
  {
    id: "wonder-talk",
    name: "Wonder Talk",
    subtitle: "Talkshow Inspirasi & Wawasan Tokoh Nasional",
    date: "21-22 Januari 2027",
    time: "08.00 - 11.30 WIB",
    venue: "Main Stage SMPIT Darul Qur-an Mulia",
    price: 50000,
    badge: "Inspiratif",
    color: "from-amber-500 to-orange-600",
    benefits: [
      "Akses Sesi Wonder Talk bersama Tokoh & Tokoh Inspiratif",
      "Tempat Duduk Reguler",
      "Snack Box & E-Sertifikat Kehadiran",
      "Akses Pameran & Bazaar Festival",
    ],
  },
  {
    id: "wonder-concert",
    name: "Wonder Concert Amal Palestina",
    subtitle: "Konser Amal Spektakuler & Penggalangan Dana Kemanusiaan",
    date: "23 Januari 2027",
    time: "08.00 - 13.00 WIB",
    venue: "Main Stage SMPIT Darul Qur-an Mulia",
    price: 75000,
    badge: "Konser Amal",
    color: "from-purple-700 to-indigo-900",
    benefits: [
      "Tiket Masuk Wonder Concert",
      "Partisipasi Langsung Donasi Kemanusiaan Palestina",
      "Gelang Konser Eksklusif Wonderkind",
      "Penampilan Seni Santri & Guest Star Spesial",
    ],
  },
];

/**
 * Standardize & Sanitize kode tiket dari scanner atau input manual
 * Mendukung ekstraksi kode jika QR memuat JSON, URL, atau trailing whitespace/newline
 */
export const sanitizeTicketCode = (raw) => {
  if (!raw || typeof raw !== 'string') return '';
  let str = raw.trim();

  // Jika input berupa JSON string
  if (str.startsWith('{') && str.endsWith('}')) {
    try {
      const parsed = JSON.parse(str);
      str = parsed.ticket_code || parsed.code || parsed.id || str;
    } catch {
      // bukan JSON valid, lanjutkan string biasa
    }
  }

  // Jika berupa URL atau string yang mengandung pola TKT-2026-XXXXXX
  const match = str.match(/TKT-202[0-9]-[A-Z0-9]{4,10}/i);
  if (match) {
    return match[0].toUpperCase();
  }

  // Pembersihan karakter non-alphanumeric selain strip
  return str.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
};

/**
 * Generate Kode Tiket Unik: TKT-2026-XXXXXX
 * Menggunakan alfabet anti-ambigu (tanpa angka 0/huruf O, angka 1/huruf I)
 */
export const generateTicketCode = () => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TKT-2026-${random}`;
};

// Fallback LocalStorage untuk simulasi offline
const getLocalTickets = () => {
  try {
    const raw = localStorage.getItem('wonderkind_tickets');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalTickets = (tickets) => {
  try {
    localStorage.setItem('wonderkind_tickets', JSON.stringify(tickets));
  } catch (e) {
    console.error(e);
  }
};

/**
 * Pesan Tiket Festival & Buat Konfirmasi WhatsApp
 */
export const orderTickets = async ({ buyer, ticketPackage, quantity = 1 }) => {
  const totalPrice = ticketPackage.price * quantity;
  const createdTickets = [];

  for (let i = 0; i < quantity; i++) {
    const ticketCode = generateTicketCode();
    createdTickets.push({
      ticket_code: ticketCode,
      buyer_name: buyer.name.trim(),
      buyer_whatsapp: buyer.whatsapp.trim(),
      buyer_email: buyer.email ? buyer.email.trim() : '',
      ticket_type: ticketPackage.name,
      event_date: ticketPackage.date,
      price: ticketPackage.price,
      payment_status: 'menunggu_verifikasi',
      checked_in: false,
      created_at: new Date().toISOString()
    });
  }

  // Simpan ke Supabase jika terhubung
  if (isSupabaseConfigured) {
    try {
      await supabase.from('tickets').insert(createdTickets);
    } catch (err) {
      console.warn('[Supabase Tickets Error]:', err);
    }
  }

  // Selalu simpan juga ke local storage sebagai backup
  const existingLocal = getLocalTickets();
  saveLocalTickets([...existingLocal, ...createdTickets]);

  const codesText = createdTickets.map((t, idx) => `Tiket ${idx + 1}: ${t.ticket_code}`).join('\n');

  // Susun teks konfirmasi WhatsApp
  const waMessage = 
`*[PEMESANAN TIKET FESTIVAL — WONDERKIND 2026]*
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Halo Panitia Wonderkind Festival, saya ingin memesan tiket:

*Paket Tiket:* ${ticketPackage.name}
*Jadwal Acara:* ${ticketPackage.date} (${ticketPackage.time})
*Jumlah:* ${quantity} tiket
*Total Biaya:* Rp ${totalPrice.toLocaleString('id-ID')}

*Data Pemesan:*
- Nama: ${buyer.name}
- WhatsApp: ${buyer.whatsapp}
- Email: ${buyer.email || '-'}
- Kategori Peserta: ${buyer.category || 'Masyarakat Umum'}

*Kode Tiket Dibuat:*
${codesText}

Mohon arahan pembayaran dan verifikasi tiket ini. Terima kasih!`;

  const waUrl = `https://wa.me/${SITE_CONFIG.officialWhatsapp}?text=${encodeURIComponent(waMessage)}`;

  return {
    success: true,
    tickets: createdTickets,
    primaryCode: createdTickets[0].ticket_code,
    totalPrice,
    whatsappUrl: waUrl,
    whatsappMessage: waMessage
  };
};

/**
 * Cari Tiket Berdasarkan Kode atau Nomor WhatsApp
 */
export const findTicketsByQuery = async (query) => {
  if (!query) return { data: [], error: null };
  const rawQuery = query.trim();
  const sanitized = sanitizeTicketCode(rawQuery);
  const cleanQuery = (sanitized || rawQuery).toUpperCase();

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .or(`ticket_code.eq.${cleanQuery},ticket_code.eq.${rawQuery.toUpperCase()},buyer_whatsapp.ilike.%${rawQuery}%`)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return { data, error: null };
      }
    } catch (e) {
      console.warn('[findTicketsByQuery Supabase Warning]:', e);
    }
  }

  // Fallback ke local storage
  const local = getLocalTickets();
  const matched = local.filter(
    t => t.ticket_code.toUpperCase() === cleanQuery || 
         t.ticket_code.toUpperCase() === rawQuery.toUpperCase() ||
         t.buyer_whatsapp.includes(rawQuery)
  );
  return { data: matched, error: null };
};

/**
 * Scan & Validasi Kehadiran Tiket (Check-In)
 * Menggunakan operasi atomik untuk pencegahan check-in ganda (double-entry race condition)
 */
export const checkInTicket = async (ticketCode, checkedInBy = 'Panitia Gate') => {
  const code = sanitizeTicketCode(ticketCode);

  if (!code) {
    return {
      success: false,
      status: 'NOT_FOUND',
      message: 'Kode tiket tidak valid atau payload QR tidak dikenali.'
    };
  }

  const now = new Date().toISOString();

  // 1. Eksekusi melalui Supabase jika terkonfigurasi
  if (isSupabaseConfigured) {
    try {
      // Ambil data tiket saat ini
      const { data: ticket, error: fetchErr } = await supabase
        .from('tickets')
        .select('*')
        .eq('ticket_code', code)
        .maybeSingle();

      if (!fetchErr && ticket) {
        // Validasi Status 1: Dibatalkan
        if (ticket.payment_status === 'dibatalkan') {
          return {
            success: false,
            status: 'CANCELLED',
            ticket,
            message: `Tiket dengan kode "${code}" telah DIBATALKAN / NONAKTIF.`
          };
        }

        // Validasi Status 2: Belum lunas
        if (ticket.payment_status !== 'lunas') {
          return {
            success: false,
            status: 'UNPAID',
            ticket,
            message: `Tiket ini BELUM LUNAS (Status: ${ticket.payment_status}). Silakan arahkan pembeli ke loket pembayaran!`
          };
        }

        // Validasi Status 3: Sudah pernah check-in sebelumnya
        if (ticket.checked_in) {
          const timeStr = ticket.checked_in_at 
            ? new Date(ticket.checked_in_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            : 'sebelumnya';

          return {
            success: false,
            status: 'ALREADY_CHECKED_IN',
            ticket,
            message: `PERINGATAN: Tiket sudah pernah di-scan pada jam ${timeStr}! (Pencegahan check-in ganda aktif)`
          };
        }

        // Update Atomik: hanya berhasil jika checked_in MASIH bernilai false
        const { data: updatedRows, error: updateErr } = await supabase
          .from('tickets')
          .update({
            checked_in: true,
            checked_in_at: now,
            checked_in_by: checkedInBy
          })
          .eq('ticket_code', code)
          .eq('checked_in', false)
          .select();

        if (!updateErr && updatedRows && updatedRows.length > 0) {
          const updatedTicket = updatedRows[0];
          // Sinkronisasi ke LocalStorage
          const local = getLocalTickets();
          saveLocalTickets(local.map(t => t.ticket_code.toUpperCase() === code ? updatedTicket : t));

          return {
            success: true,
            status: 'SUCCESS',
            ticket: updatedTicket,
            message: `CHECK-IN BERHASIL! Selamat datang, ${updatedTicket.buyer_name} (${updatedTicket.ticket_type}).`
          };
        } else if (!updateErr && (!updatedRows || updatedRows.length === 0)) {
          // 0 baris diperbarui menandakan tiket sudah di-check-in oleh gate lain tepat beberapa milidetik sebelumnya
          return {
            success: false,
            status: 'ALREADY_CHECKED_IN',
            ticket,
            message: 'PERINGATAN: Tiket baru saja digunakan di gate lain! (Pencegahan check-in ganda aktif)'
          };
        }
      }
    } catch (e) {
      console.warn('[CheckIn Supabase exception, fallback to local]:', e);
    }
  }

  // 2. Fallback Local Storage
  const local = getLocalTickets();
  const ticketIndex = local.findIndex(t => t.ticket_code.toUpperCase() === code);

  if (ticketIndex === -1) {
    return {
      success: false,
      status: 'NOT_FOUND',
      message: `Tiket dengan kode "${code}" TIDAK DITEMUKAN dalam sistem!`
    };
  }

  const localTicket = local[ticketIndex];

  if (localTicket.payment_status === 'dibatalkan') {
    return {
      success: false,
      status: 'CANCELLED',
      ticket: localTicket,
      message: `Tiket dengan kode "${code}" telah DIBATALKAN / NONAKTIF.`
    };
  }

  if (localTicket.payment_status !== 'lunas') {
    return {
      success: false,
      status: 'UNPAID',
      ticket: localTicket,
      message: `Tiket ini BELUM LUNAS (Status: ${localTicket.payment_status}). Silakan arahkan pembeli ke loket pembayaran!`
    };
  }

  if (localTicket.checked_in) {
    const timeStr = localTicket.checked_in_at 
      ? new Date(localTicket.checked_in_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      : 'sebelumnya';

    return {
      success: false,
      status: 'ALREADY_CHECKED_IN',
      ticket: localTicket,
      message: `PERINGATAN: Tiket sudah pernah di-scan pada jam ${timeStr}! (Pencegahan check-in ganda aktif)`
    };
  }

  // Sukses update LocalStorage secara sinkron
  const updatedTicket = {
    ...localTicket,
    checked_in: true,
    checked_in_at: now,
    checked_in_by: checkedInBy
  };
  local[ticketIndex] = updatedTicket;
  saveLocalTickets(local);

  return {
    success: true,
    status: 'SUCCESS',
    ticket: updatedTicket,
    message: `CHECK-IN BERHASIL! Selamat datang, ${updatedTicket.buyer_name} (${updatedTicket.ticket_type}).`
  };
};

/**
 * Ambil Semua Tiket (Untuk Dashboard Panitia)
 */
export const getAllTickets = async () => {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) return { data, error: null };
    } catch (e) {
      console.warn(e);
    }
  }

  return { data: getLocalTickets(), error: null };
};

/**
 * Verifikasi Status Pembayaran Tiket (Admin)
 */
export const verifyTicketPayment = async (ticketCode, status = 'lunas') => {
  const code = ticketCode.trim().toUpperCase();

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('tickets')
        .update({ payment_status: status })
        .eq('ticket_code', code);
    } catch (e) {
      console.error(e);
    }
  }

  const local = getLocalTickets();
  const updated = local.map(t => t.ticket_code.toUpperCase() === code ? { ...t, payment_status: status } : t);
  saveLocalTickets(updated);

  return { success: true };
};
