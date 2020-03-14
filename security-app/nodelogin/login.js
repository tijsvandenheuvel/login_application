//packages
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

//connect to db
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'mysqlroot',
	database : 'nodelogin'
});

//init express
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//display html to client
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});
app.get('/goRegister', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});
app.get('/goLogin', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

//send form data to server for authentication
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
                response.send('Incorrect Username and/or Password!');
                //response.redirect('/goLogin');
			}			
			response.end();
		});
	} else {
        response.send('Please enter Username and Password!');
		response.end();
	}
});
//send form data to server for registration
app.post('/reg', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ?', [username], function(error, results, fields) {
            //username taken
            if (results.length > 0) {
				response.send('username is allready taken');
		        response.end();
			} else {
                //check password for requirements


                //commit to database

			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
    }
});
//logged in homepage
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
app.listen(3000);
