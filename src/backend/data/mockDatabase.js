// File: backend/data/mockDatabase.js
// Untuk sementara, kita pakai data bohongan ini sebagai pengganti database asli.
// Anggap aja ini tabel-tabel di database kita.

const db = {
    // Ceritanya ini data para pengguna yang udah daftar.
    users: [
        { id: 'user-001', fullName: 'Budi Santoso', email: 'budi@example.com', password: 'password123' },
    ],
    // Ini data para petugas internal. Ada admin, verifier, teknisi.
    officers: [
        { id: 'officer-001', fullName: 'Admin LaporBos', email: 'admin@laporbos.go.id', password: 'admin123', role: 'admin' },
        { id: 'officer-002', fullName: 'Siti Aminah', email: 'siti@laporbos.go.id', password: 'password123', role: 'verifier' },
        { id: 'officer-003', fullName: 'Joko Susilo', email: 'joko@laporbos.go.id', password: 'password123', role: 'technician' },
    ],
    // Pilihan kategori laporan yang ada di form.
    categories: [
        { id: 1, name: 'Jalan Rusak' },
        { id: 2, name: 'Sampah dan Kebersihan' },
        { id: 3, name: 'Fasilitas Umum' },
        { id: 4, name: 'Gangguan Keamanan' },
        { id: 5, name: 'Lampu Jalan Mati' },
    ],
    // Ini dia data inti: semua laporan dari masyarakat.
    reports: [
        {
            id: 'report-101',
            userId: 'user-001',
            categoryId: 1,
            description: 'Jalan berlubang parah di depan SMA Negeri 1 Konoha. Sangat membahayakan pengendara motor, terutama di malam hari.',
            location: 'Jl. Pahlawan No. 45, Konoha',
            photoUrl: 'https://placehold.co/600x400/EFEFEF/AAAAAA?text=Foto+Jalan+Rusak',
            status: 'done',
            assignedOfficerId: 'officer-003',
            createdAt: '2025-05-15T09:30:00Z',
            timeline: [
                { status: 'Laporan Diterima', date: '2025-05-15T09:30:00Z', note: 'Laporan telah dicatat oleh sistem.' },
                { status: 'Verifikasi Selesai', date: '2025-05-16T11:00:00Z', note: 'Laporan telah diverifikasi oleh Siti Aminah.' },
                { status: 'Dalam Penanganan', date: '2025-05-17T14:00:00Z', note: 'Tim teknis (Joko Susilo) sedang menuju lokasi.' },
                { status: 'Selesai', date: '2025-05-18T16:45:00Z', note: 'Jalan telah diperbaiki.' },
            ],
        },
         {
            id: 'report-102',
            userId: 'user-001',
            categoryId: 3,
            description: 'Taman kota di Alun-Alun Konoha sangat kotor, banyak sampah berserakan dan bangku taman rusak.',
            location: 'Alun-Alun Konoha',
            photoUrl: 'https://placehold.co/600x400/EFEFEF/AAAAAA?text=Foto+Taman+Kotor',
            status: 'in_progress',
            assignedOfficerId: 'officer-003',
            createdAt: '2025-06-01T11:00:00Z',
            timeline: [
                { status: 'Laporan Diterima', date: '2025-06-01T11:00:00Z', note: 'Laporan telah dicatat oleh sistem.' },
                { status: 'Verifikasi Selesai', date: '2025-06-01T15:20:00Z', note: 'Laporan telah diverifikasi oleh Siti Aminah.' },
                { status: 'Dalam Penanganan', date: '2025-06-02T08:00:00Z', note: 'Tim teknis (Joko Susilo) sedang melakukan pembersihan.' },
            ],
        },
    ],
    // Komentar atau feedback dari user/petugas di setiap laporan.
    feedbacks: [
        { id: 1, reportId: 'report-101', authorId: 'user-001', comment: 'Terima kasih banyak atas respon cepatnya!', createdAt: '2025-05-18T17:00:00Z' },
        { id: 2, reportId: 'report-101', authorId: 'officer-001', comment: 'Sama-sama, Bpk. Budi. Terima kasih atas laporannya.', createdAt: '2025-05-18T17:05:00Z' },
    ]
};

// Kirim data ini biar bisa dipake di file lain.
module.exports = db;
