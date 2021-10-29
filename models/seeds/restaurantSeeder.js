// require create seeder relation modules and data
const mongoose = require('mongoose')
const restaurantList = require('../restaurant_list')
const seedData = require('../../restaurant.json')

// connect database
mongoose.connect('mongodb://localhost/restaurant_list')


const dbStatus = mongoose.connection

//connect error action
dbStatus.on('error', () => {
  console.log('mongodb connect error!')
})

//connect success action
dbStatus.once('open', () => {
  console.log('mongodb connected!')

  seedData.results.forEach(data => {
    restaurantList.create({
      name: data.name,
      name_en: data.name_en,
      category: data.category,
      image: data.image,
      location: data.location,
      phone: data.phone,
      google_map: data.google_map,
      rating: data.rating,
      description: data.description,
    })
  })
  console.log('done')
})