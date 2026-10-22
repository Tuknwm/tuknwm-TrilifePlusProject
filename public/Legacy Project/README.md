# TriLifePlus

Marketplace asuransi digital berbasis web yang menyediakan simulasi pembelian asuransi jiwa, kesehatan, dan mobil. Dibangun dengan HTML, CSS, dan JavaScript murni tanpa framework.

---

## Fitur

- **Landing Page** — Hero section, produk, tentang kami, testimoni carousel, berita, dan call-to-action daftar akun
- **Autentikasi** — Registrasi dan login dengan validasi form; data disimpan di `localStorage`
- **Navbar Dinamis** — Navbar berubah otomatis sesuai status login; nama pengguna tampil saat login dengan mekanisme logout dua langkah (nama → Logout → keluar) diikuti refresh halaman
- **Asuransi Jiwa** — Form simulasi dengan kalkulasi premi berdasarkan usia dan tanggungan
- **Asuransi Kesehatan** — Form simulasi dengan kalkulasi premi berdasarkan riwayat kesehatan
- **Asuransi Mobil** — Form simulasi lengkap dengan upload foto kendaraan
- **Checkout** — Layout dua kolom (metode pembayaran & ringkasan pesanan) dengan input dinamis per metode; modal sukses beranimasi
- **Histori Transaksi** — Daftar transaksi dengan searchbar real-time, filter tipe (kesehatan / jiwa / mobil) dan filter status (lunas / pending / expired)
- **Proteksi Halaman** — Halaman asuransi hanya bisa diakses setelah login; akses tanpa login diarahkan ke halaman login
- **Active Nav Indicator** — Navbar otomatis menandai section yang sedang di-scroll menggunakan `IntersectionObserver`

---

## Struktur File

```
TriLifePlus/
├── LandingPage.html        # Halaman utama
├── LoginPage.html          # Halaman login
├── SignUpPage.html         # Halaman registrasi
├── AsuransiJiwa.html       # Form asuransi jiwa
├── AsuransiKesehatan.html  # Form asuransi kesehatan
├── AsuransiMobil.html      # Form asuransi mobil
├── CheckOut.html           # Halaman checkout & pembayaran
├── HistoryUser.html        # Histori transaksi pengguna
├── LandingPage2.css        # Stylesheet utama (shared semua halaman)
├── LandingPage.css         # Stylesheet khusus landing page
├── LoginPage.css           # Stylesheet halaman login
├── SignUpPage.css          # Stylesheet halaman registrasi
├── script.js               # JavaScript utama (navbar, observer, form, history)
└── Img/                    # Aset gambar
```

---

## Teknologi

| Teknologi | Penggunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling, glassmorphism, animasi, grid & flexbox |
| JavaScript (Vanilla) | Logika aplikasi, DOM manipulation, localStorage |
| Google Fonts | Plus Jakarta Sans |
| AOS | Animasi scroll pada elemen |
| IntersectionObserver API | Active nav highlight saat scroll |

---

## Cara Menjalankan

Tidak memerlukan build tool atau server khusus. Cukup buka `LandingPage.html` langsung di browser, atau gunakan ekstensi **Live Server** di VS Code untuk pengalaman terbaik.

---

## Catatan

> Proyek ini bersifat simulasi dan edukasi. Data pengguna, transaksi, dan pembayaran disimpan secara lokal di browser (`localStorage`) dan tidak terhubung ke backend maupun sistem pembayaran nyata. Semua informasi legalitas hanya contoh dan tidak mewakili produk asuransi resmi. File ini merupakan file lama dan tidak akan diperbarui. (HomeWork alias my first time making this dawg website hellnah)
