const express = require('express')
const router = express.Router()
const jabatanC = require('../controllers/jabatan')
const { checkIfAdmin, checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', [checkIfAuthenticated], jabatanC.fetch)
router.post('/', [checkIfAuthenticated], jabatanC.add)
router.put('/:id', [checkIfAuthenticated], jabatanC.update)
router.delete('/:id', [checkIfAuthenticated], jabatanC.destroy)

module.exports = router