const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

// init app
const app = express();
const routes = require(path.join(__dirname, 'routes', 'Routes'));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static pages
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(expressValidator());
app.use(
  expressSession({
    secret: 'max',
    saveUninitialized: false,
    resave: false
  })
);

// Home Route
app.use(routes);

// start app
app.set('port', process.env.port || 5000);
// let port = 5000 // you can use any
app.listen(app.get('port'), () => {
  console.log('Server started on', app.get('port'));
});
