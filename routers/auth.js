const express = require('express')
const router = express.Router()
const authC = require('../controllers/auth')

router.post('/', authC.login)

module.exports = router