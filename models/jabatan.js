const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const Jabatan = connection.define('jabatan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nama: {
        type: DataTypes.STRING
    }
})

module.exports = Jabatan