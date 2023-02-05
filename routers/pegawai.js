const express = require('express')
const router = express.Router()
const pegawaiC = require('../controllers/pegawai')
const api = require('../middleware/api')
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/authentication')

router.get('/', pegawaiC.fetch)
router.post('/', pegawaiC.add)
router.put('/:id', pegawaiC.update)
router.delete('/:id', pegawaiC.destroy)

module.exports = router