const { supabase, getServiceSupabase} = require('../db/supabase');
const serviceSupabase = getServiceSupabase();
const { pagination, pagingData } = require('../utils/helper')

const fetch = async (req, res) => {

    const { page, size } = req.query
    const { limit, offset } = pagination(page-1, size)

    try {
        
       const golongan = await serviceSupabase.from("golongan").select("*")

        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: golongan.data
        })

        /* 
            #swagger.tags = ['Golongan']
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
                        { $ref: '#/definitions/Golongan' }
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
        
        const { nama, keterangan } = req.body

        const { error } = await serviceSupabase.from('golongan').insert({ 
            keterangan: keterangan,
            nama: nama,
        })

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
            message: error,
        })

    }

    /* 

        #swagger.tags = ['Golongan']
        #swagger.summary = 'Save data'
        #swagger.security = [{
            "Token": []
            }]

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddGolongan" },
            }
          }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                data: { $ref: '#/definitions/Golongan' }
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
        
        const { nama, keterangan } = req.body
        
        const { error } = await serviceSupabase.from('golongan').update({ 
            keterangan: keterangan,
            nama: nama,
        }).eq('id', id)

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
        #swagger.tags = ['Golongan']
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
            "application/json": {
              schema: { $ref: "#/definitions/AddGolongan" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                data: { $ref: '#/definitions/Golongan' }
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
        
        const { error } = await serviceSupabase.from('golongan').delete().eq('id', id)

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
        #swagger.tags = ['Golongan']
        #swagger.summary = 'Hapus data'
        #swagger.security = [{
            "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id',
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