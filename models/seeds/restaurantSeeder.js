// require create seeder relation modules and data
const restaurantList = require('../../models/restaurant_list')
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const seed_restaurant = require('../../restaurant.json').results
const dbStatus = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2],
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5],
  }
]


//connect success action
dbStatus.once('open', () => {

  Promise.all(Array.from(SEED_USER, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash,
      }))
      .then(user => {
        const userId = user._id
        let restaurantData = []
        seedUser.restaurantIndex.forEach(index => {
          seed_restaurant[index].userId = userId
          restaurantData.push(seed_restaurant[index])
        })
        return restaurantList.create(restaurantData)

      })
  }))
    .then(() => {
      console.log('data is created')
      process.exit()
    })

})