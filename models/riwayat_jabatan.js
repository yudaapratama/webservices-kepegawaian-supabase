const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const RiwayatJabatan = connection.define('riwayat_jabatan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_pegawai: {
        type: DataTypes.INTEGER
    },
    id_jabatan: {
        type: DataTypes.INTEGER
    },
})

module.exports = RiwayatJabatan