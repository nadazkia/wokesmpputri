# PANDUAN DEPLOYMENT WEBSITE WONDERKIND FESTIVAL KE HOSTINGER SINGLE

Dokumen ini berisi petunjuk resmi langkah-demi-langkah untuk melakukan build dan deployment website statis **Wonderkind Festival** ke paket hosting **Hostinger Single**.

---

## 1. PEMAHAMAN ARSITEKTUR

- **Frontend:** React.js Single Page Application (SPA).
- **Backend & Database:** Supabase (BaaS).
- **Hosting Hostinger Single:** Web server Apache murni penyaji file statis (HTML, CSS, JS, Gambar). **Tidak menjalankan Node.js di server Hostinger**.
- **Proses Build:** Seluruh kompilasi React dilakukan di komputer lokal pengembang. Hanya isi folder `build/` yang diunggah ke Hostinger.

---

## 2. PERSIAPAN FILE & ENVIRONMENT

1. Salin template environment:
   ```bash
   cp .env.example .env
   ```
2. Buka file `.env` dan masukkan kredensial Supabase Anda:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-actual-anon-key
   REACT_APP_OFFICIAL_WHATSAPP=62895622984364
   ```
   > **Catatan:** Jika belum memiliki Supabase saat ini, website tetap dapat di-build dan berjalan dengan mode offline fallback yang aman.

---

## 3. MENJALANKAN PROSES BUILD

Jalankan perintah berikut di direktori proyek:

```bash
npm run build
```
*(Di Windows PowerShell: gunakan `npm.cmd run build`)*

Setelah selesai, folder `build/` akan terbentuk dengan struktur:
```
build/
├── index.html            <- Entry point utama
├── .htaccess             <- Aturan Apache Rewrite SPA
├── favicon.ico
├── manifest.json
├── robots.txt
├── img/                  <- Foto merchandise, logo WOKE26, QRIS
└── static/
    ├── css/              <- File CSS hasil bundle Tailwind & Poppins
    └── js/               <- File JavaScript hasil kompilasi React
```

---

## 4. LANGKAH UPLOAD KE HOSTINGER SINGLE

1. Buka browser dan login ke **hPanel Hostinger** ([hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Masuk ke menu **Websites** -> pilih domain Anda -> klik **Dashboard**.
3. Cari menu **File Manager** (Manajer File) dan klik **Akses File Manager**.
4. Masuk ke folder root web server: **`public_html`**.
5. **Bersihkan File Bawaan:**
   - Jika ada file bawaan Hostinger seperti `default.php` atau `index.php` default, hapus file tersebut.
6. **Upload Isi Folder Build:**
   - Buka folder `build/` di komputer lokal Anda.
   - Pilih **semua file dan folder yang ada di dalam `build/`** (`index.html`, `.htaccess`, `static`, `img`, `favicon.ico`, dll.).
   - Upload langsung ke dalam direktori `public_html/`.
   - **PENTING:** Pastikan file `index.html` berada langsung di `public_html/index.html`, **BUKAN** di dalam subfolder seperti `public_html/build/index.html`.

> **Trik Cepat Upload:**
> Kompres seluruh isi folder `build/` menjadi file `dist.zip`. Upload `dist.zip` ke `public_html/` di File Manager Hostinger, lalu klik kanan -> **Extract**. Setelah terekstrak di `public_html`, hapus file `dist.zip`.

---

## 5. MEMASTIKAN ROUTING SPA (.HTACCESS) AKTIF

File `.htaccess` yang sudah disertakan di folder `build/` berisi konfigurasi berikut:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

Options -Indexes
AddDefaultCharset UTF-8
```

Konfigurasi ini memastikan bahwa pengunjung yang me-refresh halaman atau membuka tautan langsung ke `/admin` tidak akan terkena **Error 404 Not Found**.

---

## 6. CHECKLIST PENGUJIAN PRODUKSI

Setelah file selesai di-upload, lakukan checklist berikut di browser:

- [ ] Buka `https://namadomain.com` — pastikan halaman beranda tampil rapi dengan tipografi font Poppins.
- [ ] Uji navigasi navbar: Beranda, Tentang, Lomba, Jadwal, Merchandise, Sponsor, FAQ.
- [ ] Klik salah satu produk merchandise untuk membuka modal detail produk.
- [ ] Masukkan produk ke keranjang belanja, isi formulir data santri/pembeli.
- [ ] Klik **Checkout via WhatsApp** — pastikan kode pesanan unik `WK-...` ter-generate, dialog instruksi transfer tampil, dan WhatsApp terbuka dengan pesan terstruktur.
- [ ] Buka `https://namadomain.com/#admin` atau `https://namadomain.com/admin` — pastikan portal login panitia terbuka dengan baik.
- [ ] Lakukan refresh (F5) pada halaman admin untuk memastikan tidak ada error 404 dari web server Apache.
