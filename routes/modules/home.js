// loading router modules
const express = require('express')
const router = express.Router()

// loading mongodb Schema
const restaurantList = require('../../models/restaurant_list')

// setting home page routing
router.get('/', (req, res) => {

  // return database all data and render index page 
  return restaurantList.find()
    .lean()
    .sort()
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router