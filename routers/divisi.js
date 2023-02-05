const express = require('express')
const router = express.Router()
const divisiC = require('../controllers/divisi')

router.get('/', divisiC.fetch)
router.post('/', divisiC.add)
router.put('/:id', divisiC.update)
router.delete('/:id', divisiC.destroy)

module.exports = router