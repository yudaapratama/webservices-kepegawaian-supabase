const Jabatan = require('../models/jabatan')
const { pagination, pagingData } = require('../utils/helper');
const { supabase, getServiceSupabase} = require('../db/supabase');
const serviceSupabase = getServiceSupabase();

const fetch = async (req, res) => {

    const { page, size } = req.query;
    const { limit, offset } = pagination(page-1, size);

    try {
        
        const jabatan = await serviceSupabase.from("jabatan").select("*");
        
        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: jabatan.data
        })

        /* 
            #swagger.tags = ['Jabatan']
            #swagger.summary = 'Semua data jabatan'
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
                        { $ref: '#/definitions/Jabatan' }
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
        
        const { nama, idInstansi, idDivisi } = req.body

        const { error } = await serviceSupabase.from("jabatan").insert({ nama: nama, idInstansi: idInstansi, idDivisi: idDivisi })
        
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
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

        #swagger.tags = ['Jabatan']
        #swagger.summary = 'Save data jabatan'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/definitions/AddJabatan" },
                }
            }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                jabatan: { $ref: '#/definitions/Jabatan' }
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
    const { nama, idInstansi, idDivisi } = req.body

    try {
        
        const { error } = await serviceSupabase.from('jabatan').update({ nama: nama, idInstansi: idInstansi, idDivisi: idDivisi }).eq("id", id)

        if(error) {
            return res.status(400).json({
                success: true,
                message: error.message
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Data berhasil diupdate'
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

    /*
        #swagger.tags = ['Jabatan']
        #swagger.summary = 'Update data jabatan'
        #swagger.security = [{
                "Token": []
            }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id jabatan',
        }

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddJabatan" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                jabatan: { $ref: '#/definitions/Jabatan' }
            }
        }

        #swagger.responses[400] = {
            description: 'Terjadi kesalahan',
            schema: {
                success: false,
                message: 'Pesan error',
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
        
        const { error } = await serviceSupabase.from('jabatan').delete().eq('id', id)

        if(error) {
            return res.status(400).json({
                success: true,
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
        #swagger.tags = ['Jabatan']
        #swagger.summary = 'Hapus data jabatan'
        #swagger.security = [{
                    "Token": []
                }]
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id jabatan',
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil dihapus'
            }
        }

        #swagger.responses[400] = {
            description: 'Terjadi kesalahan',
            schema: {
                success: false,
                message: 'Pesan error',
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