const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log('MongoDB Connected successfully')
    } catch (error) {
        console.error('Error connecting to MongoDb', error)
        process.exit(1)
    }
}

module.exports = connectDB