// loading mongoose module
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

// connect mongodb server
mongoose.connect(MONGODB_URI)

// return mongodb connect status
const dbStatus = mongoose.connection

dbStatus.on('error', () => console.log('mongodb connect error!'))

dbStatus.once('open', () => console.log('mongodb connect!'))

module.exports = dbStatus