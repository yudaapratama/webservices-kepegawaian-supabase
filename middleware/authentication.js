const jwt = require('jsonwebtoken')

const getToken = (req, res, next) => {

    const auth = req.headers.authorization
    if (auth && auth.split(' ')[0] === 'Bearer') {
        
        req.authToken = auth.split(' ')[1]

    } else {
        req.authToken = null
    }

    next()
}

const checkIfAuthenticated = (req, res, next) => {

    getToken(req, res, () => {

        try {

            const { authToken } = req
            
            if (!authToken) {

                return res.status(401).json({
                    success: false,
                    message: 'Authorization Required!'
                })
            }

            return next()

        } catch (error) {
            
            return res.status(500).json({
                success: false,
                message: error.message
            })

        }

    })

    /* 
        #swagger.auto = false;
        #swagger.responses[401] = { 
            description: 'Unauthorized',
            schema: {
                success: false,
                message: 'Gagal otentikasi !'
            } 
        }
    */

}

const checkIfAdmin = (req, res, next) => {

    getToken(req, res, async () => {

        try {
            
            const { authToken } = req
            const data = jwt.verify(authToken, Buffer.from('J50nW3bT0ken', 'base64'));
        
            if (data.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Maaf anda tidak ada akses'
                })
            }

            return next()

        } catch (error) {
            
            return res.status(500).json({
                success: false,
                message: error.message
            })

        }

    })

    /*
        #swagger.auto = false;

        #swagger.responses[403] = { 
            description: 'Forbidden',
            schema: {
                success: false,
                message: 'Tidak ada akses !'
            } 
        }
    */

}

module.exports = {
    checkIfAuthenticated,
    checkIfAdmin
}