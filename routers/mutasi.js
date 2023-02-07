const express = require('express')
const router = express.Router()
const multer = require('multer') 
const path = require('path')
const { rootPath } = require('get-root-path')
const mutasiC = require('../controllers/mutasi')
const { checkIfAuthenticated } = require('../middleware/authentication')

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(rootPath, "/uploads"))
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + Date.now() + path.extname(file.originalname)
        )
    }
})

router.get('/', [checkIfAuthenticated], mutasiC.fetch)
router.post('/', [checkIfAuthenticated], mutasiC.add)
router.put('/:id', [checkIfAuthenticated], mutasiC.update)
router.delete('/:id', [checkIfAuthenticated], mutasiC.destroy)

module.exports = router