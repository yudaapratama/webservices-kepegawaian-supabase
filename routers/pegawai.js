const express = require('express')
const router = express.Router()
const pegawaiC = require('../controllers/pegawai')
const api = require('../middleware/api')
const { checkIfAuthenticated, checkIfAdmin } = require('../middleware/authentication')

router.get('/', [checkIfAuthenticated], pegawaiC.fetch)
router.post('/', [checkIfAuthenticated], pegawaiC.add)
router.put('/:id', [checkIfAuthenticated], pegawaiC.update)
router.delete('/:id', [checkIfAuthenticated], pegawaiC.destroy)

module.exports = router