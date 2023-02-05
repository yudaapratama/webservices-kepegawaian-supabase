const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const Mutasi = connection.define('mutasi', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    jenis: {
        type: DataTypes.INTEGER
    },
    tanggal: {
        type: DataTypes.DATEONLY
    },
    tujuan: {
        type: DataTypes.STRING
    },
    nomor_sk: {
        type: DataTypes.STRING
    },
    tanggal_sk: {
        type: DataTypes.DATEONLY
    },
    file_sk: {
        type: DataTypes.STRING
    },
    id_pegawai: {
        type: DataTypes.INTEGER
    }
})

module.exports = Mutasi