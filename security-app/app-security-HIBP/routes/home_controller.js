var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var path = require('path');
var HomeRoutes = express.Router();

var correct_path = path.join(__dirname+'/../views/');
HomeRoutes.get('/',function(req,res){
    let username = req.session.username;
    res.render('index',{user_name:username});
});

module.exports = {"HomeRoutes" : HomeRoutes};