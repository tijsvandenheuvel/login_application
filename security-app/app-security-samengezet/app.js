var express = require("express");
var createError = require("http-errors");
var session = require('express-session');
var expressValidator = require('express-validator');
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var logger = require("morgan");
const {v4} = require("uuid");
//const redis = require('redis');
//const redisStore = require('connect-redis')(session);
//const client  = redis.createClient();

var AccountRoutes = require('./routes/account_controller');
var HomeRoutes = require('./routes/home_controller');

var port = process.env.PORT || 3000;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//if app behind a proxy
//app.set('trust proxy',1);

app.use(session({
  secret: ['randomstringsessionsecret','anothersecret','nogeensecret'],
  genid: function(req){return v4()},
  cookie:{
    httpOnly:true,
    secure:true,
    sameSite:true,
    maxAge:600000
  },
  resave: true,
  saveUninitialized: true, 
  secure: false
}));

app.use('/',AccountRoutes.AccountRoutes);
//app.use("/home", HomeRoutes.HomeRoutes);

app.use(function(req,res,next){
  if(req.session.username == null || req.session.username.length ==0 ){
    res.redirect('/register');
  }
  else{
    next();
  }
});

app.use('/home' ,HomeRoutes.HomeRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
//app.listen(port);