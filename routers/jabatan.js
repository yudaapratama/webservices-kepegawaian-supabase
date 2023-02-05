const express = require('express')
const router = express.Router()
const jabatanC = require('../controllers/jabatan')
const { checkIfAdmin, checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', jabatanC.fetch)
router.post('/', jabatanC.add)
router.put('/:id', jabatanC.update)
router.delete('/:id', jabatanC.destroy)

module.exports = router