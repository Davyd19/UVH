const Program = require('../models/Program');

// Menampilkan semua program volunteer
exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.findAll();
        // User didapat dari middleware otentikasi yang akan kita buat
        const user = req.user; 
        res.render('mahasiswa/melihat-program-volunteer', { programs, user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error mengambil data program.");
    }
};

// Menampilkan detail satu program
exports.getProgramDetails = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
            return res.status(404).send("Program tidak ditemukan.");
        }
         const user = req.user;
        res.render('mahasiswa/detail-program_volunteer', { program, user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error mengambil detail program.");
    }
};