// loading router modules
const express = require('express')
const router = express.Router()

// 引路詳細路由檔案
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')

// 與mongodb資料庫連線
require('../config/mongoose')

// 將網址結構符合 / 字串開頭的 request 導向 home 模組 
router.use('/', home)
// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組
router.use('/restaurants', restaurants)
// 將網址結構符合 /search 字串開頭的 request 導向 search 模組
router.use('/search', search)

// 匯出路由模組
module.exports = router



