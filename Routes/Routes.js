const path = require('path');
const express = require('express');
const psrender = require('../controllers/ps-render');
const login = require('../controllers/login');

const router = express.Router();

router.get('/runscript', function(req, res) {
  res.render('index', {
    title: 'Form validation',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
});
router.post('/runscript', psrender.getScripts);

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Hello Mayur!'
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/loginCheck', function(req, res) {
  res.render('login', {
    // title: 'Form validation',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
});

router.post('/loginCheck', login.checklogin);

module.exports = router;
