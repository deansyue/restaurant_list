// loading router modules
const express = require('express')
const router = express.Router()

// 引路詳細路由檔案
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

// 與mongodb資料庫連線
require('../config/mongoose')

// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組
router.use('/restaurants', authenticator, restaurants)
// 將網址結構符合 /users 字串開頭的 request 導向 users 模組
router.use('/users', users)
// 將網址結構符合 /auth 字串開頭的 request 導向 auth 模組
router.use('/auth', auth)
// 將網址結構符合 /search 字串開頭的 request 導向 search 模組
router.use('/search', authenticator, search)
// 將網址結構符合 / 字串開頭的 request 導向 home 模組 
router.use('/', authenticator, home)

// 匯出路由模組
module.exports = router



