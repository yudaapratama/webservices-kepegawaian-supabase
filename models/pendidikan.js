const { DataTypes } = require('sequelize')
const connection  = require('../db/connection')
const Pegawai = require('../models/pegawai')

const Pendidikan = connection.define('pendidikan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    jenjang: {
        type: DataTypes.STRING,
    },
    universitas_sekolah: {
        type: DataTypes.STRING
    },
    jurusan: {
        type: DataTypes.STRING
    },
    tanggal_masuk: {
        type: DataTypes.DATEONLY
    },
    tanggal_lulus: {
        type: DataTypes.DATEONLY
    },
    gelar: {
        type: DataTypes.STRING
    },
    nilai: {
        type: DataTypes.STRING
    },
    id_pegawai: {
        type: DataTypes.INTEGER
    }
})

module.exports = Pendidikan