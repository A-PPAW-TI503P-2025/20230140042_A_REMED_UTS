const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BorrowLog = sequelize.define('BorrowLog', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false // Diambil dari Header x-user-id [cite: 52, 80]
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    latitude: {
        type: DataTypes.FLOAT, // Menyimpan koordinat [cite: 57, 77]
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT, // Menyimpan koordinat [cite: 57, 77]
        allowNull: false
    }
});

module.exports = BorrowLog;