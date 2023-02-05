const express = require('express')
const router = express.Router()
const cutiC = require('../controllers/cuti')
const { checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', cutiC.fetch)
router.post('/', cutiC.add)
router.put('/:id', cutiC.update)
router.delete('/:id', cutiC.destroy)

module.exports = router