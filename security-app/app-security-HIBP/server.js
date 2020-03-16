var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var AccountRoutes = require('./routes/account_controller');
var HomeRoutes = require('./routes/home_controller');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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