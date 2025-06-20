const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');
const { authenticateToken, authorizeRole } = require('../utils/authUtils');

// Terapkan middleware otentikasi dan otorisasi untuk semua rute di bawah ini
router.use(authenticateToken, authorizeRole('mahasiswa'));

// Definisikan rute untuk setiap fitur mahasiswa
router.get('/dashboard', mahasiswaController.showDashboard);
router.get('/aplikasi', mahasiswaController.showStatusAplikasi);
router.get('/kalender', mahasiswaController.showKalender);
router.get('/notifikasi', mahasiswaController.showNotifikasi);
router.get('/dokumen', mahasiswaController.showDokumen);
router.get('/bantuan-surat', mahasiswaController.showBantuanSurat);
router.get('/umpan-balik', mahasiswaController.showFeedbackPage);
router.post('/umpan-balik', mahasiswaController.handlePostFeedback);    

// Rute untuk melihat program ada di programRoutes.js, jadi tidak perlu di sini.

module.exports = router;
