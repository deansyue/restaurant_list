// loading modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// loading data json
// const restaurantList = require('./restaurant.json')

// loading mongodb Schema
const restaurantList = require('./models/restaurant_list')

//setting routing port
const port = 3000

// connect mongodb server
mongoose.connect('mongodb://localhost/restaurant_list')

// return mongodb connect status
const dbStatus = mongoose.connection

dbStatus.on('error', () => console.log('mongodb connect error!'))

dbStatus.once('open', () => console.log('mongodb connect!'))

// setting layout and partial template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files path
app.use(express.static('public'))

// setting urlencoded of req.body for express body-parser modules
app.use(express.urlencoded({ extended: true }))

// setting home page routing
app.get('/', (req, res) => {
  // return database all data and render index page 
  restaurantList.find()
    .lean()
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction }))
    .catch(error => console.log(error))
})

// setting show page routing
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantID = req.params.restaurant_id
  restaurantList.findById(restaurantID)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// setting search page
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  // use mongoose find database's all data and use filter function find data for keyword
  restaurantList.find()
    .lean()
    .then((restaurants) => restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())))
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction, keyword }))
    .catch(error => console.log(error))

})

// express server listening
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})