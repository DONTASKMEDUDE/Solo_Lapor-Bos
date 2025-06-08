# Lapor Bos! - Sistem Pengaduan Masyarakat

![Banner Aplikasi Lapor Bos!](https://placehold.co/1200x400/3b82f6/ffffff?text=Lapor+Bos!)

**Lapor Bos!** adalah sebuah platform berbasis web yang dirancang untuk menjadi jembatan antara masyarakat dan pemerintah di Negara Konoha. Aplikasi ini memungkinkan warga untuk dengan mudah melaporkan masalah atau keluhan yang mereka temui, serta memantau proses penyelesaiannya secara transparan dan *real-time*.

Proyek ini dibuat untuk memenuhi tugas besar mata kuliah **Amateur Radio Club (ARC) 2025**.

---

## 🚀 Fitur Utama

Aplikasi ini memiliki dua sisi: satu untuk masyarakat (pengguna) dan satu lagi untuk petugas (admin).

### Untuk Masyarakat:
* **✍️ Registrasi & Login:** Pengguna dapat membuat akun baru dan masuk ke sistem dengan aman.
* **📋 Dashboard Pribadi:** Melihat ringkasan semua laporan yang pernah dibuat (total, sedang diproses, selesai).
* **📝 Buat Laporan Baru:** Form pengaduan yang mudah digunakan, lengkap dengan kategori, deskripsi, lokasi, dan unggah foto.
* **📊 Tracking Laporan:** Pantau progres setiap laporan melalui timeline yang jelas, dari laporan diterima hingga selesai ditangani.
* **💬 Feedback & Komentar:** Berikan komentar atau feedback pada laporan yang sudah dibuat.
* **📚 Riwayat Laporan:** Semua laporan yang pernah Anda buat tersimpan rapi dan mudah dicari.

### Untuk Petugas/Admin:
* **🔐 Login Khusus & Manajemen Peran:** Sistem login terpisah untuk petugas dengan hak akses yang berbeda (Admin, Verifier, Teknisi).
* **📈 Dashboard Monitoring:** Lihat statistik laporan dalam bentuk grafik (berdasarkan status dan kategori) untuk pengambilan keputusan yang lebih baik.
* **🗂️ Manajemen Laporan:** Verifikasi laporan masuk, tugaskan ke petugas terkait, dan perbarui status penanganan.
* **⚙️ Pengelolaan Kategori:** Admin dapat menambah, mengubah, atau menghapus kategori laporan sesuai kebutuhan.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun dengan memisahkan antara frontend dan backend.

* **Frontend:**
    * HTML5
    * CSS3 (dengan **Tailwind CSS** untuk styling modern & responsif)
    * JavaScript (ES6+)
    * Chart.js untuk visualisasi data
    * Font Awesome untuk ikon

* **Backend:**
    * **Node.js** sebagai runtime environment
    * **Express.js** sebagai framework server
    * **CORS** untuk mengizinkan komunikasi antar domain

---

## 📁 Struktur Proyek

Struktur folder proyek ini mengikuti pedoman yang diberikan:

```
LaporBos_NamaTim/
├── backend/
│   ├── data/
│   │   └── mockDatabase.js  # Database sementara
│   ├── routes/
│   │   ├── auth.js          # Rute untuk login/register
│   │   └── reports.js       # Rute untuk laporan
│   └── server.js            # File utama server
│
├── frontend/
│   ├── css/
│   │   └── style.css        # Styling tambahan
│   ├── js/
│   │   └── main.js          # Otak logika frontend
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   └── ... (halaman lainnya)
│   └── index.html           # Halaman utama frontend
│
└── README.md                # Anda sedang membacanya
```

---

## ⚙️ Cara Menjalankan Aplikasi Secara Lokal

Untuk menjalankan proyek ini di komputer Anda, ikuti langkah-langkah berikut:

### Prasyarat
* Pastikan **Node.js** dan **npm** sudah terinstall di komputer Anda. Anda bisa mengunduhnya dari [nodejs.org](https://nodejs.org/).

### 1. Setup Backend
Pertama, kita perlu menjalankan server backend.

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Install semua modul yang dibutuhkan (cukup sekali)
npm install express cors

# 3. Jalankan server!
node server.js
```
Jika berhasil, terminal akan menampilkan: `Server udah nyala di http://localhost:3001. Gass!`. **Biarkan terminal ini tetap terbuka.**

### 2. Setup Frontend
Selanjutnya, kita tinggal membuka aplikasi frontend.

1.  Buka folder `frontend`.
2.  Klik dua kali pada file `index.html` untuk membukanya di browser favorit Anda.
3.  Alternatif lain, jika Anda menggunakan VS Code, Anda bisa memakai ekstensi **Live Server** untuk pengalaman yang lebih baik.

---

## 🔑 Akun untuk Login

Gunakan akun di bawah ini untuk mencoba aplikasi:

* **Sebagai Masyarakat:**
    * **Email:** `budi@example.com`
    * **Password:** `password123`

* **Sebagai Admin:**
    * **Email:** `admin@laporbos.go.id`
    * **Password:** `admin123`

---

## 👥 Anggota Tim

| Nama Anggota | Jurusan | Peran dalam Tim |
| :--- | :--- | :--- |
| Raphael C.K. | Teknik Mesin | Fullstack |
| Annisa Nabilah | Teknik Informatika | Fullstack |
| Hanan | Teknik Informatika | Fullstack |
| Mirza | Teknik Informatika | Fullstack |
| Nayo | Teknik Informatika | Fullstack |
