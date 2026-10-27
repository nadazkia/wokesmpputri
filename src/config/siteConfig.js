/**
 * Konfigurasi Terpusat Website Wonderkind Festival
 * Seluruh informasi kontak, nomor WhatsApp panitia, rekening, dan pengaturan
 * dapat diubah di sini atau dioverride melalui environment variables (.env).
 */

export const SITE_CONFIG = {
  festivalName: "Wonderkind Festival",
  tagline: "Cakrawala Perubahan, Arah Peradaban",
  edition: "2027",
  dates: "20-23 Januari 2027",
  schoolName: "SMPIT Darul Qur-an Mulia",
  location: "Pabuaran, Gunung Sindur, Kab. Bogor, Jawa Barat",

  // Kontak Resmi Panitia
  // Catatan: Jika ada nomor baru dari panitia, ganti di bawah ini atau set REACT_APP_OFFICIAL_WHATSAPP di .env
  officialWhatsapp: process.env.REACT_APP_OFFICIAL_WHATSAPP || "62895622984364", // Nomor WhatsApp Panitia
  cplomba: "6281283614172", // Nomor WhatsApp CP Lomba
  backupWhatsapp: "6282123988030",
  officialEmail: "wokesmpputri@gmail.com",

  // Media Sosial Resmi
  socialMedia: {
    instagram: "https://instagram.com/wokefest.smpputri",
    tiktok: "https://www.tiktok.com/@wokefest.smputri",
    maps: "https://maps.google.com/?q=SMPIT+Darul+Qur-an+Mulia+Gunung+Sindur",
  },

  // Konfigurasi Pembayaran Manual (Tahap 1)
  payment: {
    bankName: "BSI (Bank Syariah Indonesia)",
    accountNumber: "7123456789",
    accountHolder: "Wonderkind Festival SMPIT DQM",
    qrisUrl: "/img/qris.jpeg",
    instructions:
      "Lakukan transfer sesuai total pesanan, lalu kirimkan bukti transfer melalui WhatsApp resmi panitia untuk verifikasi admin.",
  },
};
