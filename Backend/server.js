const express = require('express')
const cors = require('cors')
const connectDB = require('./database/database')
const AuthRouter = require('./router/AuthRouter')
const MpesaRouter = require('./router/MpesaRouter/MpesaRouter')
const cookieParser = require("cookie-parser")
require('dotenv').config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())

connectDB()

app.use(AuthRouter)
app.use(MpesaRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})