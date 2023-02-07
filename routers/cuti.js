const express = require('express')
const router = express.Router()
const cutiC = require('../controllers/cuti')
const { checkIfAuthenticated } = require('../middleware/authentication')

router.get('/', [checkIfAuthenticated],  cutiC.fetch)
router.post('/', [checkIfAuthenticated], cutiC.add)
router.put('/:id', [checkIfAuthenticated], cutiC.update)
router.delete('/:id', [checkIfAuthenticated], cutiC.destroy)

module.exports = router