const Feedback = require('../models/Feedback');

// Menampilkan halaman Dashboard Mahasiswa
exports.showDashboard = (req, res) => {
    // Menggunakan res.render standar. Layout akan otomatis diterapkan.
    res.render('mahasiswa/dashboard', { 
        title: 'Dashboard Mahasiswa',
        active: 'dashboard'
    });
};

// Menampilkan halaman Status Aplikasi
exports.showStatusAplikasi = (req, res) => {
    res.render('mahasiswa/status-aplikasi', { 
        title: 'Status Aplikasi Saya',
        active: 'aplikasi'
    });
};

// Menampilkan halaman Kalender
exports.showKalender = (req, res) => {
    res.render('mahasiswa/kalender', { 
        title: 'Kalender Kegiatan',
        active: 'kalender'
    });
};

// Menampilkan halaman Notifikasi
exports.showNotifikasi = (req, res) => {
    res.render('mahasiswa/notifikasi', { 
        title: 'Notifikasi & Pengumuman',
        active: 'notifikasi'
    });
};

// Menampilkan halaman Dokumen
exports.showDokumen = (req, res) => {
    res.render('mahasiswa/dokumen', { 
        title: 'Dokumen Saya',
        active: 'dokumen'
    });
};

// Menampilkan halaman Bantuan Surat Motivasi
exports.showBantuanSurat = (req, res) => {
    res.render('mahasiswa/bantuan-surat', { 
        title: 'Asisten Surat Motivasi',
        active: 'bantuan-surat'
    });
};
// Menampilkan halaman umpan balik
exports.showFeedbackPage = (req, res) => {
    // Di masa depan, Anda bisa mengambil program yang pernah dilamar mahasiswa
    // untuk mengisi dropdown di form
    res.render('mahasiswa/umpan-balik', { 
        title: 'Beri Umpan Balik',
        active: 'umpan-balik',
        error: null,
        success_msg: null
    });
};

// Memproses data dari form umpan balik
exports.handlePostFeedback = async (req, res) => {
    try {
        const mahasiswaId = req.user.id;
        if (!req.body.rating) {
            throw new Error('Peringkat bintang wajib diisi.');
        }

        // Sekarang 'Feedback' sudah didefinisikan dan bisa dipanggil
        await Feedback.create(req.body, mahasiswaId);

        res.render('mahasiswa/umpan-balik', {
            title: 'Terima Kasih!',
            active: 'umpan-balik',
            error: null,
            success_msg: 'Umpan balik Anda telah berhasil dikirim. Kami sangat menghargainya!'
        });
    } catch (error) {
        console.error("Gagal mengirim umpan balik:", error);
        res.status(500).render('mahasiswa/umpan-balik', {
            title: 'Gagal Mengirim',
            active: 'umpan-balik',
            error: error.message || 'Terjadi kesalahan saat mengirim umpan balik.',
            success_msg: null
        });
    }
};
