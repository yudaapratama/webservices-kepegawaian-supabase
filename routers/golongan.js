const express = require('express')
const router = express.Router()
const golonganC = require('../controllers/golongan')
const { checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', [checkIfAuthenticated], golonganC.fetch)
router.post('/', [checkIfAuthenticated], golonganC.add)
router.put('/:id', [checkIfAuthenticated], golonganC.update)
router.delete('/:id', [checkIfAuthenticated], golonganC.destroy)

module.exports = router