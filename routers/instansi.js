const express = require('express')
const router = express.Router()
const JenisPegawai = require('../models/jenisPegawai')
const { checkIfAdmin, checkIfAuthenticated } = require('../middleware/authentication')
const instansiC = require('../controllers/instansi')

router.get('/', [checkIfAuthenticated], instansiC.fetch)
router.post('/', [checkIfAuthenticated], instansiC.add)
router.put('/:id', [checkIfAuthenticated], instansiC.update)
router.delete('/:id', [checkIfAuthenticated], instansiC.destroy)

module.exports = router