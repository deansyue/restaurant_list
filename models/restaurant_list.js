// require mongoose modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define restaurant_list Schema
const restaurantListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  }
})

// export Schema
module.exports = mongoose.model('restaurantList', restaurantListSchema)