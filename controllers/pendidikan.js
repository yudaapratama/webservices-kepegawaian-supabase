const { supabase, getServiceSupabase} = require('../db/supabase');
const serviceSupabase = getServiceSupabase();
const Pendidikan = require('../models/pendidikan')
const { pagination, pagingData } = require('../utils/helper')

const fetch = async (req, res) => {

    const { page, size } = req.query
    const { limit, offset } = pagination(page-1, size)

    try {
        
        const pendidikan = await serviceSupabase.from("pendidikan").select("*");

        return res.status(200).json({
            success: true,
            message: 'Sukses mengambil data',
            data: pendidikan.data
        })

        /* 
            #swagger.tags = ['Pendidikan']
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
                        { $ref: '#/definitions/Pendidikan' }
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
        
        const { nama, jenjang, jurusan, tahunMasuk, tahunLulus, gelar, nipPegawai } = req.body
 
        const { error } = await serviceSupabase.from('pendidikan').insert({ 
            jenjang: jenjang,
            nama: nama,
            jurusan: jurusan,
            tahunMasuk: tahunMasuk,
            tahunLulus: tahunLulus,
            gelar: gelar,
            nipPegawai: nipPegawai
        })

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        
        return res.status(201).json({
            success: true,
            message: 'Data berhasil ditambahkan',
        })

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error,
        })

    }

    /* 

        #swagger.tags = ['Pendidikan']
        #swagger.summary = 'Save data'
        #swagger.security = [{
                "Token": []
            }]

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddPendidikan" },
            }
          }
        }

        #swagger.responses[201] = {
            description: 'Berhasil mengirim data ke server',
            schema: {
                success: true,
                message: 'Data berhasil ditambahkan',
                data: { $ref: '#/definitions/Pendidikan' }
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
    const { nama, jenjang, jurusan, tahunMasuk, tahunLulus, gelar, nipPegawai } = req.body

    try {
        
        const { error } = await serviceSupabase.from('pendidikan').update({ 
            jenjang: jenjang,
            nama: nama,
            jurusan: jurusan,
            tahunMasuk: tahunMasuk,
            tahunLulus: tahunLulus,
            gelar: gelar,
            nipPegawai: nipPegawai
        }).eq('id', id)

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
        #swagger.tags = ['Pendidikan']
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
              schema: { $ref: "#/definitions/AddPendidikan" },
            }
          }
        }

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Data berhasil diupdate',
                data: { $ref: '#/definitions/Pendidikan' }
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
        
        const { error } = await serviceSupabase.from('pendidikan').delete().eq('id', id)

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
        #swagger.tags = ['Pendidikan']
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