const express = require('express')
const path = require('path')

// init app
const app = express()

const routes = require(path.join(__dirname, 'routes', 'Routes'))

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Home Route
app.use(routes)
app.use(express.static(path.join(__dirname, 'public')))

// start app
let port = 5000 // you can use any
app.listen(port, function () {
  console.log('Server started on', port)
})