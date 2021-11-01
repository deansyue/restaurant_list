// loading router modules
const express = require('express')
const router = express.Router()

// loading mongodb Schema
const restaurantList = require('../../models/restaurant_list')

// setting search page
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  let sortInput
  const sortData = req.query.sort.split('-')

  let sort = {}
  switch (sortData[0]) {
    case 'name':
      sort = {
        name: sortData[1]
      }
      sortData[1] === 'asc' ? sortInput = 'A -> Z' : sortInput = 'Z -> A'
      break
    case 'category':
      sort = {
        category: sortData[1]
      }
      sortInput = '類別'
      break
    case 'location':
      sort = {
        location: sortData[1]
      }
      sortInput = '地區'
      break
    default:
      sort = {
        name: 'asc'
      }
  }

  // use mongoose find database's all data and use filter function find data for keyword
  return restaurantList.find()
    .lean()
    .sort(sort)
    .then((restaurants) => restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())))
    .then((restaurantIntroduction) => res.render('index', { restaurantIntroduction, keyword, sortInput }))
    .catch(error => console.log(error))

})

// 匯出路由模組
module.exports = router