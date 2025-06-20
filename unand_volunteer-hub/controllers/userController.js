// Menampilkan dashboard mahasiswa
exports.getMahasiswaDashboard = (req, res) => {
    // Otomatis menggunakan layout-mahasiswa
    res.renderWithLayout('mahasiswa/dashboard', {
        title: 'Dashboard Mahasiswa'
    });
};

// Menampilkan dashboard admin
exports.getAdminDashboard = (req, res) => {
    // Otomatis menggunakan layout-admin
    res.renderWithLayout('admin/dashboard', {
        title: 'Dashboard Admin'
    });
};

// Menampilkan dashboard pengurus
exports.getPengurusDashboard = (req, res) => {
    // Otomatis menggunakan layout-pengurus
    res.renderWithLayout('pengurus/dashboard', {
        title: 'Dashboard Pengurus'
    });
};
