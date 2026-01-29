const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, // Validasi sederhana [cite: 83]
        validate: { notEmpty: true }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false, // Validasi sederhana [cite: 83]
        validate: { notEmpty: true }
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 }
    }
});

module.exports = Book;