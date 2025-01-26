const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided"})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token"})
    }
}

module.exports = verifyToken