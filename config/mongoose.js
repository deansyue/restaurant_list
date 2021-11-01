// loading mongoose module
const mongoose = require('mongoose')

// connect mongodb server
mongoose.connect('mongodb://localhost/restaurant_list')

// return mongodb connect status
const dbStatus = mongoose.connection

dbStatus.on('error', () => console.log('mongodb connect error!'))

dbStatus.once('open', () => console.log('mongodb connect!'))

module.exports = dbStatus