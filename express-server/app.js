var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var addListRouter = require('./routes/addList');
var fetchWatchListRouter = require('./routes/fetchWatchList');
var removeWatchListRouter = require('./routes/removeFromWatchList');

 const connect = mongoose.connect('mongodb://localhost:27017/kdrama');

 connect.then(db => {
   console.log("connected corrected to mongodb server");

 }, (err) => console.log(err));

 
var app = express();
var cors = require('cors');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addToList', addListRouter);
app.use('/fetchWatchList',fetchWatchListRouter);
app.use('/removeFromWatchList', removeWatchListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
