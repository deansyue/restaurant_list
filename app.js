// loading modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

//非正式上線，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// loading routes/index.js
const routes = require('./routes')

//setting routing port
const port = 3000

// setting layout and partial template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
// setting static files path
app.use(express.static('public'))
// setting urlencoded of req.body for express body-parser modules
app.use(express.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app
usePassport(app)

//掛載flash套件
app.use(flash())

//設定本地變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user

  //宣告flash 登入成功 失敗 顯示訊息
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  next()
})

// 設定連接路由路徑
app.use(routes)


// express server listening
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})