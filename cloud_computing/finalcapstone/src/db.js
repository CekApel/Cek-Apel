const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database
const sequelize = new Sequelize('dbname', 'user', 'password', {
    host: 'host',
    dialect: 'mysql', // Gunakan dialect MySQL
    logging: false, // Nonaktifkan log query, opsional
});

// Cek koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil!');
    })
    .catch((error) => {
        console.error('Gagal terhubung ke database:', error);
    });

module.exports = sequelize;
