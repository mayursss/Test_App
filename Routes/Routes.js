const path = require('path')
const express = require('express')


const router = express.Router()



router.get('/Get-Drives', function (req, res) {
  res.render('index'

  )
})

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello Mayur!'
  })
})

module.exports = router