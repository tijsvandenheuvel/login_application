# security app document

authors:

Tijs Van den Heuvel

Jorg Vergracht

[link to source code](https://github.com/tijsvandenheuvel/team_3_secure_login)

[link to application](https://jorg-tijs-taak.herokuapp.com)

## assignment

create a web application where

- users can register themselves with a username and password
- users can authenticate themselves using their registered username and password.

The application should securely store passwords

passwords must conform to NIST guidelines
[doc](https://pages.nist.gov/800-63-3/sp800-63b.html) section 5.1.1.1

the passwords from [HIBP](https://haveibeenpwned.com/) should be used as blacklist

use security guidelines as learned in class

deploy application on internet

## development steps

1. figure out scope & work

   - html login, register and home page
   - check if given password complies to NIST guidelines
   - connect to HIBP-API to validate with blacklist
   - connect to mySQL database
   - implement slow & salted hashing algorithm with bcrypt
   - session management with browser cookies
   - https connection
   - deploy application

2. make front end web page
   create html pages with **ejs** view engine
   - login form
   - register form
   - home / index page

3. create authentication middleware
   We created an **Express.js** project in a **Node.js** environment. 

   These are the node libraries we will use:
   - express-session: store & acces sessions with browser cookies
   - bcrypt: hash & salt password
   - sequelize: ORM to manage models & migrations
   - ejs: view engine to add node code to html
   - mysql2: used by sequelize to communicate to Mysql

   Login and register requests are handled by account_controller.js.

   Logout & home page request are handled by home_controller.js

4. slow hashing & salted
   
   We will use the **bcrypt** library for hashing & salting the password for secure storage.

5. write database connection & queries
   
   We will make a connection with a **MySQL** database.

   database queries: 
   - check if username is in db
   - check if username & hashedpassword are same as in database
   - post username & hashedpassword

   use **sequelize** for programming queries

   we use parameterised queries to counter SQL-injection

6. create the checks
    NIST: password must contain 8-64 characters.

    HIBP: check if given password is blacklisted by HIBP.
    connect with HIBP API

7. authorization
   session management

   We use **express session** library for managing sessions

   We use a UUID for a unique session ID

   When you set cookie option secure true then https is required

   We use default in memory session storage

8.  establish secure connection
   only send passwords using strong transport: **TLS** + **https**

   this ensures encrypted session ID token

11. deploy application
   We will use Heroku to deploy our application.

## results

### development technologies

We decided to use the **Express.js** and **Node.js** framework because it is open source, well supported, lots of libraries and we have the most experience with this.

For the database layer we chose **MySQL** because we know how to use this and is open-source
We use **sequelize** for Object Relational Mapping with Node

We use the **bcrypt** library/algorithm for hashing and salting passwords and securely storing and checking with database

We use **express-session** for session management

We use **Heroku** to deploy the application

### application flow

1. startup with node server.js
2. init express
3. init session
4. if no logged in session redirect to register page
5. if logged in redirect to homepage
6. login & register requests handled by account_controller

### register flow

1. ejs form
   - username
   - password
2. check NIST (password between 8 & 64 chars)
3. check if username allready in db (case insensitive)
4. check if password in HIBP API (sha1 first 5 chars)
5. slow hash + salt with bcrypt
6. persist to database

### login flow

1. ejs form
   - username
   - password
2. check if username & password are in db (parameterised)
3. update session
4. go to home screen

### startup app

1. terminal in security-app
2. npm install
3. init local database
   1. in config.json stel username & password in van uw MySQL
   2. node_modules/.bin/sequelize db:create
   3. node_modules/.bin/sequelize db:migrate
4. node app.js of npm start
5. open localhost:3000

## sources

[owasp authentication](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md)
