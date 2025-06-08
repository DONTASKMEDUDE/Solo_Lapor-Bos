// File: frontend/js/main.js
// Ini otaknya frontend. Ngatur ganti-ganti halaman, ngobrol sama backend, dan nampilin data.
// Versi ini sudah diperbaiki biar semua tombol dan fungsi jalan normal.

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    // Pastikan alamat ini sesuai dengan port backend Anda.
    const API_BASE_URL = 'http://localhost:3001/api';

    // Tempat kita nyimpen data sementara di frontend.
    const state = {
        currentUser: JSON.parse(localStorage.getItem('currentUser')),
        currentView: 'login',
        detailReportId: null, // Untuk nyimpen ID laporan yang mau diliat detailnya.
    };

    // --- Navigasi / Router ---
    // Fungsi utama buat ganti-ganti "halaman".
    const navigateTo = (view, data = null) => {
        state.currentView = view;
        // Kalau ada data tambahan (misal ID laporan), kita simpen.
        if (data && data.reportId) {
            state.detailReportId = data.reportId;
        }
        renderPage();
    };

    // Fungsi ini yang bakal ngambil file HTML dan nampilin ke layar.
    const renderPage = async () => {
        const pageMap = {
            'login': 'pages/login.html',
            'register': 'pages/register.html',
            'forgot-password': 'pages/forgot-password.html',
            'dashboard-user': 'pages/dashboard-user.html',
            'dashboard-admin': 'pages/dashboard-admin.html',
            'new-report': 'pages/new-report.html',
            'report-detail': 'pages/report-detail.html',
        };

        const pagePath = pageMap[state.currentView] || pageMap['login'];
        
        try {
            const response = await fetch(pagePath);
            appContainer.innerHTML = await response.text();
            
            // Setelah halaman baru muncul, kita perlu 'hidupkan' semua elemen di dalamnya.
            runPageSpecificLogic();
        } catch (error) {
            console.error(`Gagal memuat halaman: ${pagePath}`, error);
            appContainer.innerHTML = `<p class="text-center text-red-500">Waduh, halamannya nggak ketemu, Bos.</p>`;
        }
    };

    // --- Menjalankan Logika Spesifik per Halaman ---
    // Setelah HTML-nya siap, fungsi ini jalan buat ngisi data dan nempelin event.
    const runPageSpecificLogic = () => {
        // --- Event Listeners Umum ---
        // Semua link navigasi kita kasih event di sini.
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(e.target.closest('.nav-link').dataset.view);
            });
        });

        // --- Logika untuk Halaman Tertentu ---
        switch (state.currentView) {
            case 'login':
                document.getElementById('loginForm').addEventListener('submit', handleLogin);
                break;
            case 'register':
                document.getElementById('registerForm').addEventListener('submit', handleRegister);
                break;
            case 'forgot-password':
                document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
                break;
            case 'dashboard-user':
                document.getElementById('logout-btn').addEventListener('click', handleLogout);
                renderUserDashboard();
                break;
            case 'dashboard-admin':
                 document.getElementById('logout-btn').addEventListener('click', handleLogout);
                renderAdminDashboard();
                break;
            case 'new-report':
                document.querySelector('.nav-link[data-view="dashboard-user"]').addEventListener('click', (e) => navigateTo('dashboard-user'));
                document.getElementById('newReportForm').addEventListener('submit', handleNewReport);
                populateCategories();
                break;
            case 'report-detail':
                document.getElementById('back-to-dashboard-btn').addEventListener('click', () => {
                    const view = state.currentUser.role.includes('admin') ? 'dashboard-admin' : 'dashboard-user';
                    navigateTo(view);
                });
                renderReportDetail();
                break;
        }
    };
    
    // --- Penanganan Aksi User ---
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('login-error-msg');
        errorMsg.classList.add('hidden');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('currentUser', JSON.stringify(data));
                state.currentUser = data;
                const nextView = data.role.includes('admin') ? 'dashboard-admin' : 'dashboard-user';
                navigateTo(nextView);
            } else {
                errorMsg.textContent = data.message;
                errorMsg.classList.remove('hidden');
            }
        } catch (error) {
            errorMsg.textContent = 'Gagal nyambung ke server. Cek koneksi, Bos.';
            errorMsg.classList.remove('hidden');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('register-fullname').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const errorMsg = document.getElementById('register-error-msg');
        errorMsg.classList.add('hidden');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                alert('Pendaftaran berhasil! Silakan login.');
                navigateTo('login');
            } else {
                errorMsg.textContent = data.message;
                errorMsg.classList.remove('hidden');
            }
        } catch (error) {
             errorMsg.textContent = 'Gagal nyambung ke server.';
             errorMsg.classList.remove('hidden');
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert('Instruksi reset password (simulasi) telah dikirim ke email Anda.');
        navigateTo('login');
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        state.currentUser = null;
        navigateTo('login');
    };
    
    const handleNewReport = async (e) => {
        e.preventDefault();
        const reportData = {
            userId: state.currentUser.user.id,
            categoryId: document.getElementById('report-category').value,
            description: document.getElementById('report-description').value,
            location: document.getElementById('report-location').value,
        };
        
        try {
            const response = await fetch(`${API_BASE_URL}/reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reportData),
            });
            if(response.ok){
                alert('Laporan berhasil dikirim!');
                navigateTo('dashboard-user');
            } else {
                alert('Gagal mengirim laporan.');
            }
        } catch(error){
            alert('Gagal terhubung ke server.');
        }
    };

    const renderUserDashboard = async () => {
        document.getElementById('user-name').textContent = `Halo, ${state.currentUser.user.fullName}`;
        
        const res = await fetch(`${API_BASE_URL}/reports/user/${state.currentUser.user.id}`);
        const reports = await res.json();
        
        document.getElementById('user-total-reports').textContent = reports.length;
        document.getElementById('user-inprogress-reports').textContent = reports.filter(r => r.status === 'in_progress').length;
        document.getElementById('user-done-reports').textContent = reports.filter(r => r.status === 'done').length;

        const tableBody = document.getElementById('user-reports-table');
        tableBody.innerHTML = reports.length ? '' : `<tr><td colspan="4" class="p-4 text-center text-gray-500">Belum ada laporan.</td></tr>`;
        
        reports.forEach(report => {
            const statusBadge = `<span class="px-2 py-1 text-xs font-medium rounded-full ${report.status === 'done' ? 'bg-green-100 text-green-800' : report.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">${report.status}</span>`;
            tableBody.innerHTML += `
                <tr class="border-b">
                    <td class="p-3">${new Date(report.createdAt).toLocaleDateString('id-ID')}</td>
                    <td class="p-3">Kategori ID: ${report.categoryId}</td>
                    <td class="p-3">${statusBadge}</td>
                    <td class="p-3">
                        <button class="text-blue-600 hover:underline btn-view-detail" data-id="${report.id}">Lihat Detail</button>
                    </td>
                </tr>
            `;
        });

        document.querySelectorAll('.btn-view-detail').forEach(button => {
            button.addEventListener('click', e => navigateTo('report-detail', { reportId: e.target.dataset.id }));
        });
    };

    const renderAdminDashboard = async () => {
         document.getElementById('admin-name').textContent = `Selamat Datang, ${state.currentUser.user.fullName}`;
         // Logika untuk render chart dan tabel admin bisa ditambahkan di sini.
    };

    const populateCategories = async () => {
        const select = document.getElementById('report-category');
        try {
            const res = await fetch(`${API_BASE_URL}/reports/categories`);
            const categories = await res.json();
            categories.forEach(cat => {
                select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
            });
        } catch (error) {
            console.error('Gagal memuat kategori', error);
        }
    };

    const renderReportDetail = async () => {
        const reportId = state.detailReportId;
        if (!reportId) {
            navigateTo('dashboard-user'); // atau dashboard admin
            return;
        }

        const res = await fetch(`${API_BASE_URL}/reports/detail/${reportId}`);
        const report = await res.json();
        
        document.getElementById('report-info-content').innerHTML = `
            <h2 class="text-2xl font-bold mb-2">${report.categoryName}</h2>
            <p class="text-sm text-gray-500 mb-4">Dilaporkan oleh: <strong>${report.userName}</strong></p>
            <p class="mb-4">${report.description}</p>
            <img src="${report.photoUrl}" alt="Bukti Laporan" class="rounded-lg w-full max-w-lg mb-4 shadow">
            <p><strong>Lokasi:</strong> ${report.location}</p>
        `;
        
        const timelineContainer = document.getElementById('report-timeline');
        timelineContainer.innerHTML = '';
        report.timeline.forEach(item => {
            timelineContainer.innerHTML += `
                <div class="timeline-item">
                    <p class="font-bold text-gray-800">${item.status}</p>
                    <p class="text-sm text-gray-600">${item.note}</p>
                    <p class="text-xs text-gray-400 mt-1">${new Date(item.date).toLocaleString('id-ID')}</p>
                </div>`;
        });
    };

    // --- Inisialisasi Aplikasi ---
    const init = () => {
        if (state.currentUser) {
            const initialView = state.currentUser.role.includes('admin') ? 'dashboard-admin' : 'dashboard-user';
            navigateTo(initialView);
        } else {
            navigateTo('login');
        }
    };

    init();
});
