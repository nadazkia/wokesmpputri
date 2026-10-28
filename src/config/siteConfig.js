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
  praEventDates: "November-Desember 2026",
  technicalMeetingDate: "10 Januari 2027",
  schoolName: "SMPIT Darul Qur-an Mulia",
  location: "Pabuaran, Gunung Sindur, Kab. Bogor, Jawa Barat",


  // Kontak Resmi Panitia
  // Catatan: Jika ada nomor baru dari panitia, ganti di bawah ini atau set REACT_APP_OFFICIAL_WHATSAPP di .env
  officialWhatsapp: process.env.REACT_APP_OFFICIAL_WHATSAPP || "62895622984364", // Nomor WhatsApp Panitia
  cplomba1: "6281283614172", // Nomor WhatsApp CP Lomba
  namacplomba1: "Usth. Nova", // Nama CP Lomba 1

  cplomba2: "62895385151533", // Nomor WhatsApp CP Lomba
  namacplomba2: "Kak Hana", // Nama CP Lomba 2

  cphumas1: "6283186788611", // Nomor WhatsApp CP Humas 1
  namacphumas1: "Kak Hasna", // Nama CP Humas 1

  cphumas2: "62895622984364", // Nomor WhatsApp CP Humas 2
  namacphumas2: "Usth. Salma", // Nama CP Humas 2
  
  cpsponsor1: "6282171162181", // Nomor WhatsApp CP Sponsor 1
  namacpsponsor1: "Usth. Rizka", // Nama CP Sponsor 1

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
