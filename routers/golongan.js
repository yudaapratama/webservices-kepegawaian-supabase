const express = require('express')
const router = express.Router()
const golonganC = require('../controllers/golongan')
const { checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', golonganC.fetch)
router.post('/', golonganC.add)
router.put('/:id', golonganC.update)
router.delete('/:id', golonganC.destroy)

module.exports = router