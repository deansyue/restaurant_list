// loading modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// loading data json
const restaurantList = require('./restaurant.json')

//setting routing port
const port = 3000


// setting layout and partial template
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files path
app.use(express.static('public'))

// setting home page routing
app.get('/', (req, res) => {
  res.render('index', { restaurantIntroduction: restaurantList.results })
})

// express server listening
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})