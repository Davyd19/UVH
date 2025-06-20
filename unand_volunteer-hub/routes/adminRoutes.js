const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeRole } = require('../utils/authUtils');

router.use(authenticateToken, authorizeRole('admin'));

router.get('/dashboard', adminController.showDashboard);
router.get('/program-overview', adminController.showProgramOverview);
router.get('/seleksi-overview', adminController.showSeleksiOverview);
router.get('/jadwal-global', adminController.showJadwalGlobal);
router.get('/log-pengumuman', adminController.showLogPengumuman);
router.get('/validasi-overview', adminController.showValidasiOverview);
router.get('/analitik-komprehensif', adminController.showAnalitikKomprehensif);
router.get('/faq-manajemen', adminController.showFaqManajemen);
router.get('/manajemen-pengguna', adminController.showUserManagement);
router.get('/manajemen-pusat', adminController.showCenterManagement);
router.get('/manajemen-pusat/tambah', adminController.showAddCenterForm);
router.post('/manajemen-pusat', adminController.handleAddCenter);
router.post('/manajemen-pengguna/delete', adminController.handleDeleteUser);


module.exports = router;
