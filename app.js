var express = require('express');
var layout = require('express-layout');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

// config
var config = require('./config');

// important middleware specific files
var applogger = require('./logger');
var abuseFilter = require('./middleware/AbuseFilter');

var app = express();

// init logger
applogger.init(app);
abuseFilter.init(config);

var restrict = require('./middleware/restrict');
var login = require('./routes/login');

var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');
var exercises = require('./routes/exercises');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger(config.env));
app.use(bodyParser.json());

app.sessionMiddleware = session({
  secret: 'LOLCODEROXMENNYOYOBBZSINGHU!',
  resave: false,
  saveUninitialized: true
});
app.use(app.sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lessons',express.static(path.join(__dirname, 'lessons')));
app.use('/programs',express.static(path.join(__dirname, 'programs')));
app.use(layout());

app.use('/', login);
app.use(restrict);
app.use('/dashboard', dashboard);
app.use('/exercises', exercises);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
