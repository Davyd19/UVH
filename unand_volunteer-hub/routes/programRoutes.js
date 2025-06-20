const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const { authenticateToken } = require('../utils/authUtils');

// Semua rute program memerlukan login
router.get('/', authenticateToken, programController.getAllPrograms);
router.get('/:id', authenticateToken, programController.getProgramDetails);

module.exports = router;