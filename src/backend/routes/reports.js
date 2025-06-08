// File: backend/routes/reports.js
// Di sini kita urus semua yang berkaitan dengan laporan,
// kayak ngambil data laporan, bikin laporan baru, dll.

const express = require('express');
const router = express.Router();
const db = require('../data/mockDatabase');

// GET /api/reports - Ambil semua laporan (buat admin)
router.get('/', (req, res) => {
    // Untuk simpelnya, kita kirim semua data laporan.
    // Nanti bisa ditambahin filter, paginasi, dll.
    const reportsWithDetails = db.reports.map(report => {
        const user = db.users.find(u => u.id === report.userId);
        const category = db.categories.find(c => c.id === report.categoryId);
        return {
            ...report,
            userName: user ? user.fullName : 'Tidak diketahui',
            categoryName: category ? category.name : 'Tanpa Kategori'
        };
    });
    res.json(reportsWithDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// GET /api/reports/:userId - Ambil laporan berdasarkan ID user
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const userReports = db.reports.filter(r => r.userId === userId);
    res.json(userReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// GET /api/reports/detail/:reportId - Ambil detail satu laporan
router.get('/detail/:reportId', (req, res) => {
    const { reportId } = req.params;
    const report = db.reports.find(r => r.id === reportId);
    if (!report) {
        return res.status(404).json({ message: 'Laporan tidak ditemukan' });
    }
    // Gabungin sama data lain biar frontend enak nampilinnya
    const user = db.users.find(u => u.id === report.userId);
    const category = db.categories.find(c => c.id === report.categoryId);
    const officer = db.officers.find(o => o.id === report.assignedOfficerId);
    const feedbacks = db.feedbacks.filter(f => f.reportId === report.id);

    const fullReportDetails = {
        ...report,
        userName: user ? user.fullName : 'Tidak diketahui',
        categoryName: category ? category.name : 'Tanpa Kategori',
        officerName: officer ? officer.fullName : 'Belum ditugaskan',
        feedbacks
    };

    res.json(fullReportDetails);
});

// GET /api/reports/categories - Ambil daftar kategori
router.get('/categories', (req, res) => {
    res.json(db.categories);
});

// POST /api/reports - Buat laporan baru
router.post('/', (req, res) => {
    const { userId, categoryId, description, location } = req.body;
    
    const newReport = {
        id: `report-${Date.now()}`,
        userId,
        categoryId: parseInt(categoryId),
        description,
        location,
        photoUrl: 'https://placehold.co/600x400/EFEFEF/AAAAAA?text=Foto+Baru',
        status: 'open',
        assignedOfficerId: null,
        createdAt: new Date().toISOString(),
        timeline: [
            { status: 'Laporan Diterima', date: new Date().toISOString(), note: 'Laporan telah dicatat oleh sistem.' }
        ],
    };

    db.reports.push(newReport);
    res.status(201).json({ success: true, report: newReport });
});


module.exports = router;
