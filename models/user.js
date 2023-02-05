const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const User = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('admin', 'pegawai')
    }
})

module.exports = User