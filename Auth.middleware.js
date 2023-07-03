const jwt = require('jsonwebtoken')
require('dotenv').config()

function isAuthenticated(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log("decoded", decoded)
        next()
    } catch (error) {
        console.log(error)
        return res.send({
            error : "Auth failed"
        })
    }
}


module.exports = {
    isAuthenticated
}