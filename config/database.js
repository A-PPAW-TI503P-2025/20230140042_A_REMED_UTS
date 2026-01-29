const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database MySQL [cite: 51]
const sequelize = new Sequelize('library', 'root', 'Deandwib12345*', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3308
});

module.exports = sequelize;