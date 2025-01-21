# Salonku Booking - Frontend

Proyek ini adalah aplikasi frontend yang dibangun menggunakan Next.js untuk melakukan pemesanan salon secara online. Berikut adalah panduan instalasi proyek.

## Environment

Pastikan Anda telah menginstal hal berikut di sistem Anda:
- Node.js (v22.11.0 atau versi yang lebih tinggi)
  
## Instalasi

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
   Buat file `.env` di direktori root proyek dan tambahkan variabel berikut sebagai link API dari Laravel :
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   NEXT_PUBLIC_IMG_URL=http://127.0.0.1:8000
   ```

5. **Jalankan server**
   Mulai server Next.js dengan perintah:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:3000` dan bisa langsung diakses.
   
---

### Catatan
- Pastikan aplikasi backend Laravel telah sepenuhnya diatur dan bisa berjalan di `http://127.0.0.1:8000`.
- Untuk detail lebih lanjut tentang pengaturan backend, kunjungi [Repository Backend Salonku](https://github.com/fajaryumna/BE_Salon_Booking).

