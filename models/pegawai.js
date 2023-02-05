const { DataTypes } = require('sequelize')
const connection = require('../db/connection')
const Cuti = require('./cuti')
const Jabatan = require('./jabatan')
const JenisPegawai = require('./jenisPegawai')
const Keluarga = require('./keluarga')
const Mutasi = require('./mutasi')
const Pendidikan = require('./pendidikan')
const RiwayatJabatan = require('./riwayat_jabatan')
const StatusPegawai = require('./statusPegawai')
const User = require('./user')

const Pegawai = connection.define('pegawai', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nip: {
        type: DataTypes.STRING,
        unique: true
    },
    nama: {
        type: DataTypes.STRING
    },
    tempat_lahir: {
        type: DataTypes.STRING
    },
    tanggal_lahir: {
        type: DataTypes.DATEONLY
    },
    jenis_kelamin: {
        type: DataTypes.STRING
    },
    agama: {
        type: DataTypes.STRING
    },
    no_telpon: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    id_jabatan: {
        type: DataTypes.INTEGER
    },
    id_jenis_pegawai: {
        type: DataTypes.INTEGER
    },
    id_status_pegawai: {
        type: DataTypes.INTEGER
    },
    id_user: {
        type: DataTypes.INTEGER
    }
})

Pegawai.hasMany(Keluarga, { foreignKey: 'id_pegawai', as: 'keluarga' })
Keluarga.belongsTo(Pendidikan, { foreignKey: 'id_pegawai' })

Pegawai.hasMany(Pendidikan, { foreignKey: 'id_pegawai', as: 'pendidikan' })
Pendidikan.belongsTo(Pegawai, { foreignKey: 'id_pegawai' })

Pegawai.hasMany(RiwayatJabatan, { foreignKey: 'id_pegawai', as: 'riwayatJabatan' })
RiwayatJabatan.belongsTo(Pegawai, { foreignKey: 'id_pegawai' })

Jabatan.hasMany(Pegawai, { foreignKey: 'id_jabatan', as: 'pegawai' })
Pegawai.belongsTo(Jabatan, { foreignKey: 'id_jabatan', as: 'jabatan' })

User.hasOne(Pegawai, { foreignKey: 'id_user', as: 'pegawai' })
Pegawai.belongsTo(User, { foreignKey: 'id_user', as: 'user'})

JenisPegawai.hasMany(Pegawai, { foreignKey: 'id_jenis_pegawai', as: 'pegawai' })
Pegawai.belongsTo(JenisPegawai, { foreignKey: 'id_jenis_pegawai', as: 'jenisPegawai' })

StatusPegawai.hasMany(Pegawai, { foreignKey: 'id_status_pegawai', as: 'pegawai' })
Pegawai.belongsTo(StatusPegawai, { foreignKey: 'id_status_pegawai', as: 'statusPegawai' })

Pegawai.hasMany(Mutasi, { foreignKey: 'id_pegawai', as: 'mutasi' })
Mutasi.belongsTo(Pegawai, { foreignKey: 'id_pegawai', as: 'pegawai' })

Pegawai.hasMany(Cuti, { foreignKey: 'id_pegawai', as: 'cuti' })
Cuti.belongsTo(Pegawai, { foreignKey: 'id_pegawai', as: 'pegawai' })

module.exports = Pegawai