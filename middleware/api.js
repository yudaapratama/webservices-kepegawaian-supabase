const axios = require('axios')

// const Service = (req, res, next) => {

//     const auth = req.headers.authorization

//     req.CustomAxios = axios.create({
//         headers: { 
//             Accept: 'application/json',
//             Authorization: auth
//         }
//     })

//     next()

// }

module.exports = (req, res, next) => {
    const auth = req.headers.authorization

    req.CustomAxios = axios.create({
        headers: { 
            Accept: 'application/json',
            Authorization: auth
        }
    })

    next()
}