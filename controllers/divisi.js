const supabase = require('../db/supabase');
const { pagination, pagingData } = require('../utils/helper')

const fetch = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pagination(page-1, size);

    try {
        
        const divisi = await supabase.from("divisi").select("*")

        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: divisi.data
        })

        /* 
            #swagger.tags = ['Divisi']
            #swagger.summary = 'Semua data Divisi'
            
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
                        { $ref: '#/definitions/Divisi' }
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
        
        const { idInstansi, nama } = req.body

        const { error } = await supabase.from('divisi').insert({
            nama: nama,
            idInstansi: idInstansi
        })

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
            message: error.message,
        })

    }

    /* 

        #swagger.tags = ['Divisi']
        #swagger.summary = 'Save data Divisi'
        
        
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddDivisi" },
            }
          }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                data: { $ref: '#/definitions/Divisi' }
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
    const { status } = req.body

    try {
        
        const { idInstansi, nama } = req.body

        const { error } = await supabase.from('divisi').insert({
            nama: nama,
            idInstansi: idInstansi
        })

        if(error) {
            return res.status(400).json({
                success: false,
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
        #swagger.tags = ['Divisi']
        #swagger.summary = 'Update data'
        
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id Divisi',
        }

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddDivisi" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                data: { $ref: '#/definitions/Divisi' }
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

        const { error } = await supabase.from('divisi').delete().eq('id', id)

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
        #swagger.tags = ['Divisi']
        #swagger.summary = 'Hapus data Divisi'
        
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'Id Divisi',
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