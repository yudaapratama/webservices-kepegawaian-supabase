const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const JenisPegawai = connection.define('jenis_pegawai', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    jenis: {
        type: DataTypes.STRING
    }
})

module.exports = JenisPegawai