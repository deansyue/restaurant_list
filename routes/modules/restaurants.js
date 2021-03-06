// loading router modules
const express = require('express')
const router = express.Router()

// loading mongodb Schema
const restaurantList = require('../../models/restaurant_list')

// router of click 新增參廳 button 
router.get('/new', (req, res) => {
  res.render('new')
})

// router of click submit in new page
router.post('/new', (req, res) => {
  req.body['userId'] = req.user._id

  return restaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// setting show page routing
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return restaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// router of click edit button
router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return restaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// router of click submit button in edit page
router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return restaurantList.findOne({ _id, userId })
    .then((restaurant) => {
      Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// router of click delete button
router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return restaurantList.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router