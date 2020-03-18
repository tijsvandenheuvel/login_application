var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
var models = require('../models');
var Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const https = require('https');
const crypto = require('crypto');

var accountRoutes = express.Router();

accountRoutes.get('/login',function(req,res){
    res.render('login',{error: ''});
});
accountRoutes.get('/register',function(req,res){  
    res.render('register',{error: ""});
});

/* Eerst checken of hij in HIBP staat en zo niet, checken of het tussen 8-24 karakters is en zo niet, checken of de username al bestaat en zo niet, registreren */
accountRoutes.post('/register',function(req,resp){
    
   let passwd = req.body.password;
   let hashedPassword = crypto.createHash('sha1')
   .update(passwd)
   .digest('hex')
   .toUpperCase();

    let prefix = hashedPassword.slice(0, 5);
    let apiCall = `https://api.pwnedpasswords.com/range/${prefix}`;

    let hashes = '';

    https.get(apiCall, function (res) {
        res.setEncoding('utf8');
        res.on('data', (chunk) => hashes += chunk);
        res.on('end', onEnd);
    }).on('error', function (err) {
        console.error(`Error: ${err}`);
    });

    function onEnd() {
        let res = hashes.split('\r\n').map((h) => {
        let sp = h.split(':');
            return {
                hash: prefix + sp[0],
                count: parseInt(sp[1])
            }
        });
        let found = res.find((h) => h.hash === hashedPassword);
            /*in HIBP database*/
            if (found) {
                console.log(`Found ${found.count} matches! Password vulnerable!`);
                resp.render('register', {error: 'This password is found in the HIBP database. Please choose another one.'})

            } 
            /*niet in HIBP database*/
            else {
                console.log('No matches found!');
                
                /*8 karakters of meer */
                if(req.body.password.length >= 8 && req.body.password.length <= 64){

                    var matched_users_promise = models.User.findAll({
                    where:{username: req.body.username}
                    });

                    matched_users_promise.then(function(users){ 
                        
                        /*username bestaat nog niet, POST*/
                        if(users.length == 0){
                            const passwordHash = bcrypt.hashSync(req.body.password,10);
                            models.User.create({
                                username: req.body.username,
                                password: passwordHash
                            }).then(function(){
                                //req.session.regenerate();
                                req.session.username = req.body.username;
                                resp.redirect('/home');
                            });
                        }
                        /*username bestaat al */
                        else{
                            resp.render('register',{error: "Username already in use"});
                        }
                    })
                }
                /*minder dan 8 karakters*/
                else{
                    resp.render('register', {error: "Password must be at least 8 characters long, and can't be longer than 64 characters."})
                }
            }
    }
});

accountRoutes.post('/login',function(req,res){

    var matched_users_promise = models.User.findAll({
        where: {username: req.body.username}
    });
    matched_users_promise.then(function(users){ 
        if(users.length > 0){
            let user = users[0];
            let passwordHash = user.password;
            if(bcrypt.compareSync(req.body.password,passwordHash)){
                //req.session.regenerate();
                req.session.username = req.body.username;
                res.redirect('/home');
            }
            else{
                res.render('login', {error: 'Login failed; Invalid user ID or password'});
            }
        }
        else{
            res.render('login', {error: "Login failed; user doesn't exist. Please create an account."});
        }
    });
});

module.exports = {"AccountRoutes" : accountRoutes};