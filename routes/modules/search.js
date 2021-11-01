// loading router modules
const express = require('express')
const router = express.Router()

// loading mongodb Schema
const restaurantList = require('../../models/restaurant_list')

// setting search page
router.get('/', (req, res) => {
  const keyword = req.query.keyword

  // use mongoose find database's all data and use filter function find data for keyword
  return restaurantList.find()
    .lean()
    .then((restaurants) => restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())))
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction, keyword }))
    .catch(error => console.log(error))

})

// 匯出路由模組
module.exports = router