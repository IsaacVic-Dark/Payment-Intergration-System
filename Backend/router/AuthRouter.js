const {register, login, checkAuth, logout}  = require('../controller/AuthController')
const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/checkAuth', verifyToken, checkAuth)
router.post('/logout', logout)

module.exports = router