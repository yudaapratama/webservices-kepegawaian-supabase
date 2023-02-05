const express = require('express')
const router = express.Router()
const JenisPegawai = require('../models/jenisPegawai')
const { checkIfAdmin, checkIfAuthenticated } = require('../middleware/authentication')
const instansiC = require('../controllers/instansi')

router.get('/', instansiC.fetch)
router.post('/', instansiC.add)
router.put('/:id', instansiC.update)
router.delete('/:id', instansiC.destroy)

module.exports = router