const { supabase, getServiceSupabase} = require('../db/supabase');
const serviceSupabase = getServiceSupabase();
const JenisPegawai = require('../models/jenisPegawai')
const { pagination, pagingData } = require('../utils/helper')

const fetch = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination(page-1, size);

    try {
        
        const instansi = await serviceSupabase.from('instansi').select('*')

        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: instansi.data
        })

        /* 
            #swagger.tags = ['Instansi']
            #swagger.summary = 'Semua data Instansi'
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
                        { $ref: '#/definitions/Instansi' }
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
        
        const { nama, alamat } = req.body

        const { error } = await serviceSupabase.from('instansi').insert({ nama: nama, alamat: alamat })

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }
        
        return res.status(201).json({
            success: false,
            message: 'Data berhasil ditambahkan',
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

    /* 

        #swagger.tags = ['Instansi']
        #swagger.summary = 'Save data Instansi'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddInstansi" },
            }
          }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                data: { $ref: '#/definitions/Instansi' }
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
        
        const { nama, alamat } = req.body

        const { error } = await serviceSupabase.from('instansi').update({ nama: nama, alamat: alamat }).eq('id', id)

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message,
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
        #swagger.tags = ['Instansi']
        #swagger.summary = 'Update data Instansi'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id Instansi',
        }

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddJenisPegawai" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                data: { $ref: '#/definitions/Instansi' }
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

        const { error } = await serviceSupabase.from('instansi').delete().eq('id', id)

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
        #swagger.tags = ['Instansi']
        #swagger.summary = 'Hapus data Instansi'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id Instansi',
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