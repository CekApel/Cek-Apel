const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Artikels = sequelize.define('Artikels', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    penanganan_penyakit: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING, // Tambahkan kolom untuk URL gambar
        allowNull: true,
    },
}, {
    tableName: 'artikels',
    timestamps: false,
});

module.exports = Artikels;
