var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// custom connection mysql
var mysql = require('mysql');
var connection = require('express-myconnection');

var index = require('./routes/index');
var users = require('./routes/users');
// rest-api router
var api = require('./routes/api');
// photo display router
var photo = require('./routes/photo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('title', 'Express file upload');
// default upload dir
app.locals.uploadDir = path.join(__dirname, 'upload');

// setting json format
app.set('json spaces', 4);
app.set('json replacer', null);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

// connect to my sql
app.use(
    connection(mysql, {
        host: '192.168.1.100',
        port: 3306,
        user: 'hanhnt',
        password: 'hanhduc',
        database: 'rest_api'
        }, 'pool')
);

//app.use('/', index);
app.use('/api', api);
app.use('/users', users);
// photo route
app.use('/photo', photo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
