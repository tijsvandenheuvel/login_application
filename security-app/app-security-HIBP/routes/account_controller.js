var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
var models = require('../sequelize_backend/models');
var Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

var accountRoutes = express.Router();

accountRoutes.get('/login',function(req,res){
    res.render('login');
});
accountRoutes.get('/register',function(req,res){  
    res.render('register',{errors: ""});
});

accountRoutes.post('/register',function(req,res){
    var matched_users_promise = models.User.findAll({
        where:{username: req.body.username}
            
    });
    matched_users_promise.then(function(users){ 
        if(users.length == 0){
            const passwordHash = bcrypt.hashSync(req.body.password,10);
            models.User.create({
                username: req.body.username,
                password: passwordHash
            }).then(function(){
                let newSession = req.session;
                newSession.username = req.body.username;
                res.redirect('/');
            });
        }
        else{
            res.render('register',{errors: "Username already in use"});
        }
    })
});

accountRoutes.post('/login',function(req,res){
    var matched_users_promise = models.User.findAll({
        where: {username: req.body.username}
    });
    matched_users_promise.then(function(users){ 
        console.log(users);
        if(users.length > 0){
            let user = users[0];
            let passwordHash = user.password;
            if(bcrypt.compareSync(req.body.password,passwordHash)){
                req.session.username = req.body.username;
                console.log("joepie")
                res.redirect('/');
            }
            else{
                console.log("ai");
                res.redirect('/register');
            }
        }
        else{
            console.log("oei oei");
            res.redirect('/login');
        }
    });
});
module.exports = {"AccountRoutes" : accountRoutes};