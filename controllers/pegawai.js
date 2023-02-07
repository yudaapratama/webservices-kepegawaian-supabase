const Pegawai = require('../models/pegawai')
const Keluarga = require('../models/keluarga')
const Pendidikan = require('../models/pendidikan')
const RiwayatJabatan = require('../models/riwayat_jabatan')
const Jabatan = require('../models/jabatan')
const JenisPegawai = require('../models/jenisPegawai')
const { pagination, pagingData } = require('../utils/helper')
const User = require('../models/user')
const StatusPegawai = require('../models/statusPegawai')
const { supabase, getServiceSupabase} = require('../db/supabase');
const serviceSupabase = getServiceSupabase();

const jabatanService = process.env.SERVICE_JABATAN
const jenisService = process.env.SERVICE_JENIS
const statusService = process.env.SERVICE_STATUS

const fetch = async (req, res) => {

    const { page, size } = req.query
    const { limit, offset } = pagination(page-1, size)

    try {
        
        const pegawai = await serviceSupabase.from("pegawai").select("*");

        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: pegawai.data
        })

        /* 
            #swagger.tags = ['Pegawai']
            #swagger.summary = 'Semua data pegawai'
            #swagger.security = [{
                "Token": []
            }]
            #swagger.parameters['page'] = {
                in: 'query',
                description: 'Parameter untuk pagination',
            }
            #swagger.parameters['size'] = {
                in: 'query',
                description: 'Parameter untuk limit data',
            }

            #swagger.responses[200] = {
                description: 'Berhasil request data ke server',
                schema: {
                    success: true,
                    message: 'Sukses mengambil data',
                    totalItems: 1,
                    rows: [
                        { $ref: '#/definitions/Pegawai' }
                    ],
                    totalPages: 1,
                    currentPage: 1
                }
            }

            #swagger.responses[500] = {
                description: 'Ada masalah di sisi server',
                schema: {
                    success: false,
                    message: 'Pesan error'
                }
            }
        */
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message 
        })

    }
}

const add = async (req, res) => {
    try {
        
        const { 
            nip,
            nama,
            email,
            noTelepon,
            idTipe,
            idStatus,
            idInstansi,
            idDivisi,
            idJabatan,
            idGolongan,
            uuidUser
        } = req.body

        const { data, error } = await serviceSupabase.from("pegawai").insert({ nip, nama, email, noTelepon: `+62${noTelepon}`, idTipe, idStatus, idInstansi, idDivisi, idJabatan, idGolongan, uuidUser })

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        
        return res.status(201).json({
            success: false,
            message: 'Data berhasil ditambahkan'
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error,
        })

    }

    /* 

        #swagger.tags = ['Pegawai']
        #swagger.summary = 'Save data pegawai'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddPegawai" },
            }
          }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                data: { $ref: '#/definitions/Pegawai' }
            }
        }

        #swagger.responses[500] = {
            description: 'Ada masalah di sisi server',
            schema: {
                success: false,
                message: 'Pesan error'
            }
        }
    
    */
} 

const update = async (req, res) => {
    const id = req.params.id
    const {
        nama,
        email,
        noTelepon,
        idTipe,
        idStatus,
        idInstansi,
        idDivisi,
        idJabatan,
        idGolongan,
        uuidUser
    } = req.body

    try {
        
        const { error } = await serviceSupabase.from("pegawai").update({
            nama: nama,
            email: email,
            noTelepon: noTelepon,
            idTipe: idTipe,
            idStatus: idStatus,
            idInstansi: idInstansi,
            idDivisi: idDivisi,
            idJabatan: idJabatan,
            idGolongan: idGolongan,
            uuidUser: uuidUser
        }).eq("nip", id);

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data berhasil diupdate',
            data
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

    /*
        #swagger.tags = ['Pegawai']
        #swagger.summary = 'Update data'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id pegawai',
        }

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddPegawai" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                data: { $ref: '#/definitions/Pegawai' }
            }
        }

        #swagger.responses[404] = {
            description: 'Terjadi kesalahan',
            schema: {
                success: false,
                message: 'Data tidak ditemukan',
            }
        }

        #swagger.responses[500] = {
            description: 'Ada masalah di sisi server',
            schema: {
                success: false,
                message: 'Pesan error'
            }
        }

    */
}

const destroy = async (req, res) => {
    const id = req.params.id

    try {
        
        const { error } = await serviceSupabase.from("pegawai").delete().eq("nip", id)

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data berhasil dihapus',
        })


    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

    /*
        #swagger.tags = ['Pegawai']
        #swagger.summary = 'Hapus data pegawai'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id pegawai',
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil dihapus'
            }
        }

        #swagger.responses[404] = {
            description: 'Terjadi kesalahan',
            schema: {
                success: false,
                message: 'Data tidak ditemukan',
            }
        }

        #swagger.responses[500] = {
            description: 'Ada masalah di sisi server',
            schema: {
                success: false,
                message: 'Pesan error'
            }
        }

    */
}

module.exports = {
    fetch,
    add,
    update,
    destroy,
}