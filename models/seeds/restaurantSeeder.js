// require create seeder relation modules and data
const restaurantList = require('../../models/restaurant_list')
const seedData = require('../../restaurant.json')
const dbStatus = require('../../config/mongoose')


//connect success action
dbStatus.once('open', () => {

  seedData.results.forEach(data => {
    restaurantList.create(data)
  })
  console.log('data is created')
  process.exit()
})