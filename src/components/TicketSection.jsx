import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { 
  Ticket, Calendar, Clock, MapPin, Check, QrCode, 
  Search, X, Copy, Download, ArrowRight, Printer, ShieldCheck
} from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { TICKET_PACKAGES, orderTickets, findTicketsByQuery } from '../services/ticketService';
import { SITE_CONFIG } from '../config/siteConfig';

const TicketSection = () => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerWhatsapp, setBuyerWhatsapp] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerCategory, setBuyerCategory] = useState('Masyarakat Umum');
  const [isOrdering, setIsOrdering] = useState(false);
  const [completedTickets, setCompletedTickets] = useState(null);

  // E-Ticket Viewer State
  const [isCheckTicketOpen, setIsCheckTicketOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [foundTickets, setFoundTickets] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeETicket, setActiveETicket] = useState(null);

  const qrCanvasRef = useRef(null);

  // Render QR Code on canvas with High Contrast & Standard Quiet Zone
  useEffect(() => {
    if (activeETicket && qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        activeETicket.ticket_code,
        {
          width: 240,
          margin: 4, // Quiet zone standar 4 modul (ISO/IEC 18004)
          errorCorrectionLevel: 'H', // Error correction level High (30% redundancy)
          color: {
            dark: '#000000', // Hitam murni untuk kontras optik tertinggi kamera
            light: '#FFFFFF' // Putih murni
          }
        },
        (error) => {
          if (error) console.error('Error rendering QR:', error);
        }
      );
    }
  }, [activeETicket]);

  const handleOpenOrder = (pkg) => {
    setSelectedPackage(pkg);
    setQuantity(1);
  };

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerWhatsapp.trim()) {
      toast({
        title: 'Data Belum Lengkap',
        description: 'Nama dan Nomor WhatsApp wajib diisi.',
        variant: 'destructive'
      });
      return;
    }

    setIsOrdering(true);
    try {
      const result = await orderTickets({
        buyer: {
          name: buyerName,
          whatsapp: buyerWhatsapp,
          email: buyerEmail,
          category: buyerCategory
        },
        ticketPackage: selectedPackage,
        quantity: parseInt(quantity, 10)
      });

      if (result.success) {
        setCompletedTickets(result);
        window.open(result.whatsappUrl, '_blank');
        toast({
          title: 'Tiket Berhasil Dipesan!',
          description: `Total ${quantity} tiket dibuat. Silakan konfirmasi via WhatsApp.`,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Gagal Memesan Tiket',
        description: 'Terjadi kendala sistem. Silakan coba kembali.',
        variant: 'destructive'
      });
    } finally {
      setIsOrdering(false);
    }
  };

  const handleSearchTickets = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const { data } = await findTicketsByQuery(searchQuery);
    setFoundTickets(data || []);
    if (data && data.length > 0) {
      setActiveETicket(data[0]);
    } else {
      setActiveETicket(null);
    }
  };

  const handleDownloadTicket = () => {
    if (qrCanvasRef.current && activeETicket) {
      const link = document.createElement('a');
      link.download = `E-Ticket-${activeETicket.ticket_code}.png`;
      link.href = qrCanvasRef.current.toDataURL('image/png');
      link.click();
      toast({
        title: 'E-Ticket Disimpan',
        description: 'QR Code E-Ticket resolusi tinggi berhasil diunduh.',
      });
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <section id="tickets" className="py-24 bg-gradient-to-b from-wk-white via-wk-lightOrange/15 to-wk-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-wk-gold/20 text-wk-darkRed px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Ticket className="w-4 h-4 text-wk-red" /> Tiket Resmi Wonderkind 2026
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-wk-darkRed">
              Pilihan Tiket Festival & Event
            </h2>
            <p className="text-gray-600 mt-4 text-base">
              Dapatkan akses eksklusif ke panggung inspirasi Wonder Talk, kajian akbar Wonder Qur'an, dan Wonder Concert. Tiket dilengkapi QR Code unik untuk akses pintu masuk.
            </p>
          </motion.div>

          {/* Tombol Cek E-Ticket */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => setIsCheckTicketOpen(true)}
              variant="outline"
              className="border-2 border-wk-red text-wk-red hover:bg-wk-red hover:text-white rounded-2xl px-6 py-6 font-bold text-sm shadow-md flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" /> Cek & Lihat E-Ticket Saya
            </Button>
          </motion.div>
        </div>

        {/* Ticket Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {TICKET_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-wk-orange/20 flex flex-col overflow-hidden relative"
            >
              {/* Header Card with Gradient */}
              <div className={`p-6 bg-gradient-to-r ${pkg.color} text-white relative`}>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {pkg.badge}
                </span>
                <h3 className="text-xl font-bold leading-tight">{pkg.name}</h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">{pkg.subtitle}</p>

                <div className="mt-4 pt-3 border-t border-white/20">
                  <span className="text-xs text-white/70 block">Harga Tiket:</span>
                  <div className="text-2xl font-extrabold text-wk-gold">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Perforation Effect (Sobekan Tiket) */}
              <div className="relative flex items-center justify-between px-2 py-1 bg-white">
                <div className="w-5 h-5 rounded-full bg-gray-100 -ml-4 border-r border-gray-200"></div>
                <div className="flex-1 border-b-2 border-dashed border-gray-200 mx-2"></div>
                <div className="w-5 h-5 rounded-full bg-gray-100 -mr-4 border-l border-gray-200"></div>
              </div>

              {/* Body Card */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-4">
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-wk-orange flex-shrink-0" />
                      <span>{pkg.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-wk-orange flex-shrink-0" />
                      <span>{pkg.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-wk-orange flex-shrink-0" />
                      <span className="line-clamp-1">{pkg.venue}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Benefit Tiket:</span>
                    <ul className="space-y-2">
                      {pkg.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="text-xs text-gray-700 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={() => handleOpenOrder(pkg)}
                  className="w-full bg-wk-red hover:bg-wk-darkRed text-white py-5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Pesan Tiket <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal 1: Pemesanan Tiket */}
      <AnimatePresence>
        {selectedPackage && !completedTickets && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border-4 border-wk-gold relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <span className="text-xs bg-wk-gold/20 text-wk-darkRed font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Form Pemesanan
                </span>
                <h3 className="text-2xl font-bold text-wk-darkRed mt-2">{selectedPackage.name}</h3>
                <p className="text-xs text-gray-500">{selectedPackage.date} • {selectedPackage.venue}</p>
              </div>

              <form onSubmit={handleProcessOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap Pemesan *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Nama lengkap Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-wk-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="text"
                    required
                    value={buyerWhatsapp}
                    onChange={(e) => setBuyerWhatsapp(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-wk-red focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">E-Ticket dan konfirmasi akan dikirim ke nomor ini.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email (Opsional)</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-wk-red focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Kategori Pemesan</label>
                    <select
                      value={buyerCategory}
                      onChange={(e) => setBuyerCategory(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-wk-red focus:outline-none"
                    >
                      <option value="Masyarakat Umum">Masyarakat Umum</option>
                      <option value="Wali Santri DQM">Wali Santri DQM</option>
                      <option value="Santri / Pelajar">Santri / Pelajar</option>
                      <option value="Alumni DQM">Alumni DQM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Jumlah Tiket</label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-xl"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-bold text-base text-wk-darkRed">{quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-11 w-11 rounded-xl"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Total Ringkasan */}
                <div className="bg-wk-lightOrange/20 border border-wk-orange/30 p-4 rounded-2xl mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-600 block">Total Pembayaran:</span>
                    <span className="text-xs text-gray-400">{quantity} tiket x Rp {selectedPackage.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-2xl font-bold text-wk-red">
                    Rp {(selectedPackage.price * quantity).toLocaleString('id-ID')}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isOrdering}
                  className="w-full bg-wk-red hover:bg-wk-darkRed text-white py-6 rounded-2xl font-bold text-base shadow-lg transition-all mt-4"
                >
                  {isOrdering ? 'Menyiapkan Tiket...' : 'Lanjutkan ke WhatsApp Panitia'}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Tiket Berhasil Dipesan */}
      <AnimatePresence>
        {completedTickets && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-wk-gold text-center relative"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-wk-darkRed">Pesanan Tiket Diterima!</h3>
              <p className="text-xs text-gray-600 mt-1 mb-4">
                Berikut adalah kode tiket Anda. Simpan kode ini untuk mengecek E-Ticket Anda setelah verifikasi panitia.
              </p>

              <div className="bg-gray-50 border rounded-2xl p-4 mb-4 text-left space-y-2">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Kode Tiket Anda:</span>
                {completedTickets.tickets.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center font-mono font-bold text-wk-red text-sm bg-white p-2 rounded-lg border">
                    <span>{t.ticket_code}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(t.ticket_code);
                        toast({ title: 'Tersalin', description: `${t.ticket_code} disalin ke clipboard` });
                      }}
                      className="text-gray-400 hover:text-gray-700 p-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-xs bg-wk-lightOrange/20 border border-wk-orange/30 p-3 rounded-xl mb-6 text-left">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Total Tagihan:</span>
                  <span className="font-bold text-wk-red">Rp {completedTickets.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transfer ke:</span>
                  <span>{SITE_CONFIG.payment.bankName} - {SITE_CONFIG.payment.accountNumber}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-xl shadow-md"
                  onClick={() => window.open(completedTickets.whatsappUrl, '_blank')}
                >
                  Konfirmasi ke WhatsApp Panitia
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-5 rounded-xl"
                  onClick={() => {
                    setCompletedTickets(null);
                    setSelectedPackage(null);
                  }}
                >
                  Selesai & Tutup
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 3: Cek & Lihat E-Ticket dengan Live QR Code */}
      <AnimatePresence>
        {isCheckTicketOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-wk-gold relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCheckTicketOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-wk-darkRed">Cari & Tampilkan E-Ticket</h3>
                <p className="text-xs text-gray-500">Masukkan Kode Tiket (contoh: <code>TKT-2026-XXXXXX</code>) atau Nomor WhatsApp pemesan.</p>
              </div>

              {/* Form Pencarian */}
              <form onSubmit={handleSearchTickets} className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Kode Tiket atau No. WA..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-wk-red focus:outline-none font-mono"
                  />
                </div>
                <Button type="submit" className="bg-wk-red hover:bg-wk-darkRed text-white px-5 rounded-xl text-xs font-semibold">
                  Cari
                </Button>
              </form>

              {/* Hasil Pencarian */}
              {hasSearched && foundTickets.length === 0 && (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">Tiket Tidak Ditemukan</p>
                  <p className="text-xs text-gray-400 mt-1">Pastikan kode tiket atau nomor WhatsApp yang Anda masukkan sudah sesuai.</p>
                </div>
              )}

              {/* Selector jika ditemukan lebih dari 1 tiket */}
              {foundTickets.length > 1 && (
                <div className="mb-4">
                  <span className="text-xs text-gray-500 block mb-1">Ditemukan {foundTickets.length} tiket. Pilih tiket:</span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {foundTickets.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveETicket(t)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-mono font-bold whitespace-nowrap transition-all ${
                          activeETicket?.ticket_code === t.ticket_code
                            ? 'bg-wk-red text-white border-wk-red shadow-sm'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {t.ticket_code}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual E-Ticket Card */}
              {activeETicket && (
                <div id="printable-eticket" className="bg-gradient-to-br from-wk-white to-wk-lightOrange/20 border-2 border-wk-gold rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start border-b border-wk-orange/20 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-wk-orange text-[10px] font-bold uppercase tracking-wider mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> OFFICIAL E-TICKET WONDERKIND
                      </div>
                      <h4 className="text-lg font-bold text-wk-darkRed">{activeETicket.ticket_type}</h4>
                      <p className="text-xs text-gray-500">{activeETicket.event_date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      activeETicket.payment_status === 'lunas' 
                        ? 'bg-green-100 text-green-800' 
                        : activeETicket.payment_status === 'dibatalkan'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {activeETicket.payment_status === 'lunas' 
                        ? 'LUNAS & VALID' 
                        : activeETicket.payment_status === 'dibatalkan'
                        ? 'DIBATALKAN'
                        : 'MENUNGGU VERIFIKASI'}
                    </span>
                  </div>

                  {/* QR Code Container with High-Contrast White Background & Quiet Zone */}
                  <div className="flex flex-col items-center justify-center my-4 bg-white p-5 rounded-2xl border-2 border-dashed border-wk-orange/30 shadow-inner">
                    <canvas ref={qrCanvasRef} className="rounded-xl shadow-sm max-w-full" />
                    
                    <div className="flex items-center justify-center gap-2 mt-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                      <span className="font-mono font-bold text-wk-darkRed text-base tracking-widest">
                        {activeETicket.ticket_code}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(activeETicket.ticket_code);
                          toast({ title: 'Tersalin', description: 'Kode tiket disalin ke clipboard.' });
                        }}
                        className="text-gray-400 hover:text-wk-red p-1"
                        title="Salin Kode Manual"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1.5 text-center">
                      Tunjukkan QR Code ini di gerbang masuk. Alternatif: sebutkan kode manual di atas.
                    </span>
                  </div>

                  {/* Info Pemilik */}
                  <div className="bg-white/90 rounded-2xl p-4 text-xs space-y-2 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center"><span className="text-gray-500">Nama Pemesan:</span> <span className="font-bold text-gray-900">{activeETicket.buyer_name}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500">Nomor WhatsApp:</span> <span className="font-medium text-gray-800 font-mono">{activeETicket.buyer_whatsapp}</span></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Status Check-In:</span> 
                      <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        activeETicket.checked_in ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {activeETicket.checked_in 
                          ? `Sudah Hadir (${activeETicket.checked_in_at ? new Date(activeETicket.checked_in_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''} WIB)`
                          : 'Belum Digunakan'}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Download & Print */}
                  <div className="mt-5 pt-3 border-t border-wk-orange/20 flex gap-2">
                    <Button
                      onClick={handleDownloadTicket}
                      variant="outline"
                      className="flex-1 border-wk-red/40 text-wk-darkRed hover:bg-wk-red/10 py-5 rounded-xl text-xs font-semibold"
                    >
                      <Download className="w-4 h-4 mr-1.5" /> Unduh QR
                    </Button>
                    <Button
                      onClick={handlePrintTicket}
                      className="flex-1 bg-wk-darkRed hover:bg-wk-red text-white py-5 rounded-xl text-xs font-semibold shadow-md"
                    >
                      <Printer className="w-4 h-4 mr-1.5" /> Cetak E-Ticket
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TicketSection;
