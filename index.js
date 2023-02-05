
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./doc.json')
const bodyParser = require('body-parser') 
const express = require('express')

const AuthRouting = require('./routers/auth')
const PegawaiRouting = require('./routers/pegawai')
const GolonganRouting = require('./routers/golongan')
const PendidikanRouting = require('./routers/pendidikan')
const JabatanRouting = require('./routers/jabatan')
const InstansiRouting = require('./routers/instansi')
const DivisiRouting = require('./routers/divisi')
// const UserRouting = require('./routers/user')
const MutasiRouting = require('./routers/mutasi')
const CutiRouting = require('./routers/cuti')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use('/login', AuthRouting)
// app.use('/user', UserRouting)
app.use('/jabatan', JabatanRouting)
app.use('/instansi', InstansiRouting)
app.use('/divisi', DivisiRouting)
app.use('/pegawai', PegawaiRouting)
app.use('/golongan', GolonganRouting)
app.use('/pendidikan', PendidikanRouting)
app.use('/mutasi', MutasiRouting)
app.use('/cuti', CutiRouting)


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.listen(port, () => {
    console.log(`Up and Running on port ${port} - Webservice Kepegawaian`);
    // console.log(``);
})
