const { DataTypes } = require('sequelize')
const connection = require('../db/connection')

const StatusPegawai = connection.define('status_pegawai', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING
    }
})

module.exports = StatusPegawai