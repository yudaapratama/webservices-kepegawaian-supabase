const express = require('express')
const router = express.Router()
const { checkIfAuthenticated } = require('../middleware/authentication')
const pendidikanC = require('../controllers/pendidikan')

router.get('/', pendidikanC.fetch)
router.post('/', pendidikanC.add)
router.put('/:id', pendidikanC.update)
router.delete('/:id', pendidikanC.destroy)

module.exports = router
