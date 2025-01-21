# Salonku Booking - Frontend

Proyek ini adalah aplikasi frontend yang dibangun menggunakan Next.js untuk mengelola pemesanan salon. Berikut adalah panduan untuk mengatur proyek ini.

## Persiapan Lingkungan

Pastikan Anda telah menginstal hal berikut di sistem Anda:
- Node.js (v22.11.0 atau versi yang lebih tinggi)
  
## Instruksi Instalasi

1. **Clone repository**
   Buka terminal Anda dan navigasikan ke direktori tempat Anda ingin menyimpan proyek. Clone repository menggunakan perintah berikut:
   ```bash
   git clone https://github.com/fajaryumna/FE_Salon_Booking.git
   ```

2. **Masuk ke direktori proyek**
   ```bash
   cd FE_Salon_Booking
   ```

3. **Instal dependensi**
   Jalankan perintah berikut untuk menginstal dependensi Node.js yang diperlukan:
   ```bash
   npm install
   ```

4. **Buat file .env**
   Buat file `.env` di direktori root proyek dan tambahkan variabel lingkungan berikut:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   NEXT_PUBLIC_IMG_URL=http://127.0.0.1:8000
   ```

5. **Instal library yang diperlukan**
   Instal library tambahan yang digunakan dalam proyek ini dengan menjalankan perintah berikut:
   ```bash
   npm install react-calendar
   npm install date-fns
   npm install axios
   npm i js-cookie
   npm install date-fns-tz
   ```

6. **Jalankan server pengembangan**
   Mulai server pengembangan Next.js dengan perintah:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:3000` secara default.

## Mengakses Aplikasi

1. Buka browser Anda dan akses:
   ```
   http://localhost:3000
   ```

2. Pastikan API backend juga berjalan di `http://127.0.0.1:8000`.

3. Anda sekarang dapat berinteraksi dengan aplikasi frontend Salonku Booking.

---

### Catatan
- Pastikan aplikasi backend telah sepenuhnya diatur dan berjalan sebelum memulai frontend.
- Untuk detail lebih lanjut tentang pengaturan backend, kunjungi [Repository Backend Salonku](https://github.com/fajaryumna/BE_Salon_Booking).

