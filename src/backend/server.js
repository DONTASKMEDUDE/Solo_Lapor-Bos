// File: backend/server.js
// Ini file utama untuk menjalankan server backend Lapor Bos!.
// Semua request dari frontend bakal masuk lewat sini dulu.

const express = require('express');
const cors = require('cors');

// Kita panggil rute-rute yang sudah dipisah filenya biar rapi.
// Path-nya kita benerin dari '...' jadi './'
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 3001; // Pakai port 3001 kalau tidak ada settingan lain.

// --- Middleware ---
// Ini semacam 'satpam' yang ngecek setiap request yang masuk.

// CORS: Biar frontend bisa ngobrol sama backend tanpa diblok browser.
app.use(cors());
// express.json(): Biar server ngerti kalau dikirimin data format JSON.
app.use(express.json());

// --- Rute Utama ---
// Endpoint iseng buat ngecek server jalan atau nggak.
app.get('/', (req, res) => {
    res.send('Server Lapor Bos! aman, Bos. Siap menerima laporan!');
});

// Arahkan semua request yang awalnya '/api/auth' ke file auth.js
app.use('/api/auth', authRoutes);
// Arahkan semua request yang awalnya '/api/reports' ke file reports.js
app.use('/api/reports', reportRoutes);

// Jalankan servernya!
app.listen(PORT, () => {
    console.log(`Server udah nyala di http://localhost:${PORT}. Gass!`);
});

// Arahkan semua request yang awalnya '/api/auth' ke file auth.js
app.use('/api/auth', authRoutes);
// Arahkan semua request yang awalnya '/api/reports' ke file reports.js
app.use('/api/reports', reportRoutes);

// Jalankan servernya!
app.listen(PORT, () => {
    console.log(`Server udah nyala di http://localhost:${PORT}. Gass!`);
});
