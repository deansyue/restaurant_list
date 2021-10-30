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
  return restaurantList.find()
    .lean()
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants/new', (req, res) => {
  const createData = req.body
  return restaurantList.create({
    name: createData.name,
    name_en: createData.name_en,
    category: createData.category,
    rating: Number(createData.rating),
    location: createData.location,
    phone: createData.phone,
    description: createData.description,
    image: createData.image,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// setting show page routing
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantID = req.params.restaurant_id
  return restaurantList.findById(restaurantID)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// setting search page
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  // use mongoose find database's all data and use filter function find data for keyword
  return restaurantList.find()
    .lean()
    .then((restaurants) => restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())))
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction, keyword }))
    .catch(error => console.log(error))

})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const modifyData = req.body
  return restaurantList.findById(id)
    .then((restaurant) => {
      restaurant.name = modifyData.name
      restaurant.name_en = modifyData.name_en
      restaurant.category = modifyData.category
      restaurant.rating = Number(modifyData.rating)
      restaurant.location = modifyData.location
      restaurant.phone = modifyData.phone
      restaurant.description = modifyData.description
      restaurant.image = modifyData.image

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantList.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// express server listening
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})