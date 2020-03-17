var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var AccountRoutes = require('./routes/account_controller');
var HomeRoutes = require('./routes/home_controller');


var port = process.env.PORT || 3001;
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'randomstringsessionsecret',
    resave: true,
    saveUninitialized: true, 
    secure:false 
}));

app.use('/',AccountRoutes.AccountRoutes);


app.use(function(req,res,next){
    if(req.session.username == null || req.session.username.length ==0 ){
      res.redirect('/register');
    }
    else{
      next();
    }
  });
  app.use('/',HomeRoutes.HomeRoutes);

app.listen(port);