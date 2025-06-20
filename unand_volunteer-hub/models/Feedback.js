const db = require('../config/database');

class Feedback {
    /**
     * Menyimpan umpan balik baru ke dalam database.
     * @param {object} data - Data dari form (program_id, rating, dll).
     * @param {number} mahasiswaId - ID dari mahasiswa yang login.
     */
    static async create(data, mahasiswaId) {
        const { program_id, rating, saran, masalah_teknis } = data;
        const sql = `
            INSERT INTO feedback
            (mahasiswa_id, program_id, rating, saran, masalah_teknis)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        // Pastikan program_id yang kosong disimpan sebagai NULL
        const finalProgramId = program_id || null;

        const [result] = await db.execute(sql, [mahasiswaId, finalProgramId, rating, saran, masalah_teknis]);
        return result.insertId;
    }
}

module.exports = Feedback;
