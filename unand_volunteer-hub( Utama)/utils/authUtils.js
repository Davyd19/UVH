const jwt = require('jsonwebtoken');
const Mahasiswa = require('../models/Mahasiswa');
const Pengurus = require('../models/Pengurus');
const Admin = require('../models/Admin');

// Middleware untuk memverifikasi token dan men-set user di res.locals
exports.authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/'); // Jika tidak ada token, kembali ke halaman utama

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user;
        // Cari user di tabel yang benar berdasarkan peran di token
        switch (decoded.role) {
            case 'mahasiswa':
                user = await Mahasiswa.findById(decoded.id);
                break;
            case 'pengurus':
                user = await Pengurus.findById(decoded.id);
                break;
            case 'admin':
                user = await Admin.findById(decoded.id);
                break;
            default:
                return res.status(403).send('Peran dalam token tidak valid.');
        }
        
        if (!user) {
            res.clearCookie('token');
            return res.redirect('/');
        }
        
        // Tambahkan peran ke objek user untuk konsistensi
        user.role = decoded.role;
        req.user = user; // Untuk digunakan di logic controller
        res.locals.user = user; // Untuk digunakan di semua view EJS
        next();

    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/');
    }
};

// Middleware untuk otorisasi berdasarkan peran (tidak berubah)
exports.authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user && req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).send('Akses Ditolak: Anda tidak memiliki izin yang cukup.');
        }
    };
};
