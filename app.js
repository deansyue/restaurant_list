// loading modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// loading routes/index.js
const routes = require('./routes')

//setting routing port
const port = 3000

// setting layout and partial template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files path
app.use(express.static('public'))
// setting urlencoded of req.body for express body-parser modules
app.use(express.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 設定連接路由路徑
app.use(routes)


// express server listening
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})