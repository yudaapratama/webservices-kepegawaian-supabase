const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const Keluarga = connection.define('keluarga', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hubungan: {
        type: DataTypes.ENUM('suami/istri', 'anak', 'ayah', 'ibu', 'saudara laki-laki', 'saudara perempuan'),
    },
    nama: {
        type: DataTypes.STRING
    },
    id_pegawai: {
        type: DataTypes.INTEGER
    },
    
})

module.exports = Keluarga