const express = require('express')
const router = express.Router()
const { checkIfAuthenticated } = require('../middleware/authentication')
const pendidikanC = require('../controllers/pendidikan')

router.get('/', [checkIfAuthenticated], pendidikanC.fetch)
router.post('/', [checkIfAuthenticated], pendidikanC.add)
router.put('/:id', [checkIfAuthenticated], pendidikanC.update)
router.delete('/:id', [checkIfAuthenticated], pendidikanC.destroy)

module.exports = router
