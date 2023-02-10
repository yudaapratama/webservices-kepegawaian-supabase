const { supabase, getServiceSupabase} = require('../db/supabase');
const serviceSupabase = getServiceSupabase();
const Jabatan = require('../models/jabatan');
const JenisPegawai = require('../models/jenisPegawai');
const Mutasi = require('../models/mutasi');
const Pegawai = require('../models/pegawai');
const StatusPegawai = require('../models/statusPegawai');
const { pagination, pagingData } = require('../utils/helper')

const fetch = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination(page-1, size);

    try {
        
        const mutasi = await serviceSupabase.from("mutasi").select("*");

        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: mutasi.data
        })

        /* 
            #swagger.tags = ['Mutasi']
            #swagger.summary = 'Semua data'
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
                        { $ref: '#/definitions/Mutasi' }
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
            message: error 
        })

    }
}


const add = async (req, res) => {
    try {
    
        const { 
            nipPegawai,
            detail,
            jenisMutasi,
            tanggalMutasi,
        } = req.body

        const { error } = serviceSupabase.from('mutasi').insert({
            nipPegawai: nipPegawai,
            detail: detail,
            jenisMutasi: jenisMutasi,
            tanggalMutasi: tanggalMutasi
        })

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }
        
        return res.status(201).json({
            success: true,
            message: 'Data berhasil ditambahkan',
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

    /* 

        #swagger.tags = ['Mutasi']
        #swagger.summary = 'Save data'
        #swagger.security = [{
                "Token": []
            }]
        
        #swagger.requestBody = {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/definitions/AddMutasi" },
            }
          }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                data: { $ref: '#/definitions/Mutasi' }
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

    try {
        
        const { 
            nipPegawai,
            detail,
            jenisMutasi,
            tanggalMutasi,
        } = req.body

        const { error } = serviceSupabase.from('mutasi').update({
            nipPegawai: nipPegawai,
            detail: detail,
            jenisMutasi: jenisMutasi,
            tanggalMutasi: tanggalMutasi
        }).eq("id", id)

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data berhasil diupdate',
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

    /*
        #swagger.tags = ['Mutasi']
        #swagger.summary = 'Update data'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id',
        }

        #swagger.requestBody = {
          required: true,
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/definitions/AddMutasi" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                data: { $ref: '#/definitions/Mutasi' }
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

        const { error } = serviceSupabase.from('mutasi').delete().eq("id", id)

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message,
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
        #swagger.tags = ['Mutasi']
        #swagger.summary = 'Hapus data'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id ',
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
    destroy
}