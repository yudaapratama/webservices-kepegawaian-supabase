const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const Cuti = connection.define('cuti', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    jumlah: {
        type: DataTypes.INTEGER
    },
    tanggal_awal: {
        type: DataTypes.DATEONLY
    },
    tanggal_akhir: {
        type: DataTypes.DATEONLY
    },
    status: {
        type: DataTypes.ENUM('Y', 'N')
    },
    id_pegawai: {
        type: DataTypes.INTEGER
    }
})

module.exports = Cuti