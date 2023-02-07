const express = require('express')
const router = express.Router()
const divisiC = require('../controllers/divisi')
const { checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', [checkIfAuthenticated], divisiC.fetch)
router.post('/', [checkIfAuthenticated], divisiC.add)
router.put('/:id', [checkIfAuthenticated], divisiC.update)
router.delete('/:id', [checkIfAuthenticated], divisiC.destroy)

module.exports = router