// File: backend/routes/auth.js
// Semua rute yang berhubungan sama login, register, dll. ada di sini.

const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// Endpoint buat login: POST /api/auth/login
router.post('/login', (req, res) => {
    // Ambil email dan password dari body request yang dikirim frontend.
    const { email, password } = req.body;

    // Cek dulu di data user biasa.
    const user = db.users.find(u => u.email === email && u.password === password);
    // Kalau nggak ada, coba cari di data petugas.
    const officer = db.officers.find(o => o.email === email && o.password === password);

    if (user) {
        // Kalau ketemu sebagai user, kirim balik datanya plus role-nya.
        return res.json({ success: true, user, role: 'user' });
    } 
    
    if (officer) {
        // Kalau ketemu sebagai petugas, kirim balik datanya plus role dari database.
        return res.json({ success: true, user: officer, role: officer.role });
    }

    // Kalau udah dicari di mana-mana nggak ada, yaudah gagal.
    res.status(401).json({ success: false, message: 'Email atau password salah, Bos!' });
});

// Endpoint buat daftar: POST /api/auth/register
router.post('/register', (req, res) => {
    // Ambil data dari form registrasi.
    const { fullName, email, password } = req.body;
    
    // Pastikan emailnya belum pernah dipake.
    const emailExists = db.users.some(u => u.email === email) || db.officers.some(o => o.email === email);
    if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email ini sudah terdaftar. Coba pake email lain.' });
    }

    // Kalau aman, buat user baru.
    const newUser = { id: `user-${Date.now()}`, fullName, email, password };
    db.users.push(newUser);
    
    // Kasih kabar ke frontend kalau registrasi berhasil.
    res.status(201).json({ success: true, user: newUser });
});

module.exports = router;
