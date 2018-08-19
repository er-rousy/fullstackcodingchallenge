const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const config = require('./config');

// connect to the database and load models
require('./context').connect(config.dbUri);


const app = express();
app.set('port', process.env.PORT || 9500);
// tell the app to look for static files in these directorie
app.use(express.static(path.join(__dirname, './../dist')));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// pass the passport middleware
app.use(passport.initialize());



// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);


// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);


// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(app.get('port'), () => {
  console.info(`serving  http://localhost:${app.get('port')}`);
});