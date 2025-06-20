// === BAGIAN YANG DITAMBAHKAN ===
// Impor model yang diperlukan di bagian atas file
const Admin = require("../models/Admin");
const VolunteerCenter = require("../models/VolunteerCenter");
// ================================

// Menampilkan halaman Dashboard Admin
exports.showDashboard = (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard Admin",
    active: "dashboard",
  });
};

// Menampilkan halaman Overview Program
exports.showProgramOverview = (req, res) => {
  res.render("admin/program-overview", {
    title: "Overview Program",
    active: "program-overview",
  });
};

// Menampilkan halaman Manajemen Pengguna dengan logika pencarian
exports.showUserManagement = async (req, res) => {
  try {
    // Ambil kata kunci pencarian dari query URL (e.g., ?q=budi)
    const searchQuery = req.query.q || "";

    // Panggil model dengan kata kunci pencarian
    const users = await Admin.findAllUsers(searchQuery);

    res.render("admin/manajemen-pengguna", {
      title: "Manajemen Pengguna",
      active: "manajemen-pengguna",
      users: users,
      searchQuery: searchQuery, // Kirim kembali query untuk ditampilkan di kotak pencarian
      error: null,
    });
  } catch (error) {
    console.error("Error di showUserManagement:", error);
    res.status(500).render("admin/manajemen-pengguna", {
      title: "Error",
      active: "manajemen-pengguna",
      users: [],
      error: "Terjadi kesalahan saat mengambil data pengguna.",
    });
  }
};

// Fungsi baru untuk menangani penghapusan pengguna
exports.handleDeleteUser = async (req, res) => {
  try {
    const { userId, role } = req.body;

    // Validasi untuk mencegah admin menghapus akunnya sendiri
    if (req.user.id == userId && req.user.role === role) {
      // Sebaiknya tidak redirect, tapi tampilkan pesan error
      // Untuk saat ini, kita redirect saja
      return res.redirect("/admin/manajemen-pengguna");
    }

    await Admin.deleteUser(userId, role);
    res.redirect("/admin/manajemen-pengguna");
  } catch (error) {
    console.error("Gagal menghapus pengguna:", error);
    // Idealnya, redirect dengan pesan error
    res.redirect("/admin/manajemen-pengguna?error=delete_failed");
  }
};

// Menampilkan halaman Manajemen Pusat Volunteer dengan logika pencarian
exports.showCenterManagement = async (req, res) => {
  try {
    // Ambil kata kunci pencarian dari URL, contoh: /manajemen-pusat?q=migas
    const searchQuery = req.query.q || "";

    // Panggil model dengan kata kunci pencarian
    const centers = await VolunteerCenter.findAll(searchQuery);

    res.render("admin/manajemen-pusat", {
      title: "Manajemen Pusat Volunteer",
      active: "manajemen-pusat",
      centers: centers,
      searchQuery: searchQuery, // Kirim kembali query agar bisa ditampilkan di kotak pencarian
    });
  } catch (error) {
    console.error("Error mengambil data pusat volunteer:", error);
    res.status(500).render("admin/manajemen-pusat", {
      title: "Error",
      active: "manajemen-pusat",
      centers: [],
      error: "Gagal mengambil data pusat volunteer.",
    });
  }
};

// Menampilkan form untuk menambah pusat baru
exports.showAddCenterForm = (req, res) => {
  res.render("admin/tambah-pusat", {
    title: "Tambah Pusat Baru",
    active: "manajemen-pusat",
  });
};

// Memproses data dari form tambah pusat
exports.handleAddCenter = async (req, res) => {
  try {
    await VolunteerCenter.create(req.body);
    res.redirect("/admin/manajemen-pusat");
  } catch (error) {
    res.status(500).render("admin/tambah-pusat", {
      title: "Gagal Menambah Pusat",
      active: "manajemen-pusat",
      error: "Nama pusat mungkin sudah ada atau terjadi kesalahan.",
    });
  }
};

// ... (sisa fungsi controller lainnya)

exports.showSeleksiOverview = (req, res) => {
  res.render("admin/seleksi-overview", {
    title: "Overview Seleksi",
    active: "seleksi-overview",
  });
};

exports.showJadwalGlobal = (req, res) => {
  res.render("admin/jadwal-global", {
    title: "Manajemen Jadwal Global",
    active: "jadwal-global",
  });
};

exports.showLogPengumuman = (req, res) => {
  res.render("admin/log-pengumuman", {
    title: "Log Pengumuman Sistem",
    active: "log-pengumuman",
  });
};

exports.showValidasiOverview = (req, res) => {
  res.render("admin/validasi-overview", {
    title: "Overview Validasi Dokumen",
    active: "validasi-overview",
  });
};

exports.showAnalitikKomprehensif = (req, res) => {
  res.render("admin/analitik-komprehensif", {
    title: "Analitik Komprehensif",
    active: "analitik-komprehensif",
  });
};

exports.showFaqManajemen = (req, res) => {
  res.render("admin/faq-manajemen", {
    title: "Manajemen FAQ",
    active: "faq-manajemen",
  });
};
