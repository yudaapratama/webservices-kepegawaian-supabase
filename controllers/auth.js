const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const supabase = require('../db/supabase')

const login = async (req, res) => {

    const { username, password } = req.body

    try {

        const { data: user, error } = await supabase.auth.signInWithPassword({ email: username, password: password });
        
        const token = jwt.sign({ user: user }, Buffer.from('J50nW3bT0ken', 'base64'), { expiresIn: '5h' })

        const data = {
            username: username,
            access_token: token,
            access_type: 'Bearer',
            expires: '5h',
        }

        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Sukses login',
            data
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }

    /*
        #swagger.tags = ['Login']
        #swagger.summary = 'Login untuk mendapatkan akses token'

        #swagger.responses[200] = {
            description: 'Berhasil request data ke server',
            schema: {
                success: true,
                message: 'Sukses login',
                data: { 
                    username: 'username',
                    level: 'role',
                    access_token: 'token',
                    access_type: 'Bearer',
                    expires: '5h',
                }
            }
        }

        #swagger.responses[404] = {
            description: 'Terjadi kesalahan',
            schema: {
                success: false,
                message: 'User tidak ditemukan',
            }
        }

        #swagger.responses[401] = {
            description: 'Terjadi kesalahan',
            schema: {
                success: false,
                message: 'Password salah!',
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
    login
}