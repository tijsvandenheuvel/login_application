# security app document

authors:
Tijs Van den Heuvel
Jorg Vergracht

[link to source code](https://github.com/tijsvandenheuvel/team_3_secure_login)
[link to application]()

## assignment

a web application where 
- users can register themselves with a username and password
- users can authenticate themselves using their registered username and password. 

the application should securely store passwords

passwords conforms to NIST guidelines
[doc](https://pages.nist.gov/800-63-3/sp800-63b.html) section 5.1.1.1

the passwords from [HIBP](https://haveibeenpwned.com/) should be used as blacklist 

use security guidelines as learned in class

deploy application on internet

## development steps

1. figure out scope & work
   - html login & register page
   - check if given password complies to NIST guidelines
   - connect to HIBP-API to validate with blacklist
   - connection to database 
   - implement slow & salted hashing algorithm bcrypt
   - session mgmt with browser cookies
   - https connection with TLS certificate

2. make front end web page
    create html pages with **ejs** view engine
    - login form
    - register form
    - home / index page
   
3. establish secure connection
    only send passwords using strong transport: **TLS** + **https**
    this ensures encrypted session ID token

4. create authentication middleware
    create **Express.js** file for middleware (server.js) 
    establish connection with **MySQL** database
    - express-session: store & acces sessions with browser cookies
    - bcrypt: hash & salt password
    - sequelize: ORM to manage models & migrations
    - ejs: view engine to add node code to html
    - mysql2: used by sequelize to communicate to Mysql 

    login & register requests handled by account_controller.js

    > fix routing / redirecting to manouvre between methods
    > make username case insensitive
    
5. slow hashing & salted
    use **bcrypt** library for hashing & salting


6. write database connection & queries
    authenticate by checking username & password in database
    - check if username is in db
    - check if username & hashedpassword are same as in database
    - post username & hashedpassword
  
    use **sequelize** for programming queries
    we use parameterised queries to counter SQL-injection

    > use generic error messages

7. create the checks
   - NIST (passwoord tussen 8 en 64 tekens)
   - HIBP: eerst hashen en dan check met API 

8. authorization
    session management
    token management
    
    application flow

    **express session** library for managing sessions

    **passport.js** or **Auth0** frameworks ?

    **OpenIDConnect** protocol
    - identity token
    - acces token

    cookie option secure: true -> https required
    session:
        secret: 'thisisthecookiesecret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    > figure out correct cookie / session options

    > zoek uit: session store ? 
    

9. deploy application 
    > get HTTPS, TLS certificate
    search & get free host provider

## results

### development technologies
We decided to use the **Express.js** and **Node.js** framework because it is open source, well supported, lots of libraries and we have the most experience with this.

For the database layer we chose **MySQL** because we know how to use this and is open-source
We use **sequelize** for Object Relational Mapping with Node

We use the **bcrypt** library/algorithm for hashing and salting passwords and securely storing and checking with database

### application flow
1. startup with node server.js
1. init express
2. init session
3. if no logged in session redirect to register page
4. if logged in redirect to homepage
5. login & register requests handled by account_controller

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
1. terminal in app-security-samengezet
2. npm install 
3. init local database
   1. in config.json stel username & password in van uw MySQL 
   2. node_modules/.bin/sequelize db:create
   3. node_modules/.bin/sequelize db:migrate
4. node app.js
5. open localhost:3000


## TO DO 

zoek uit hoe deployen online  (AWS educate)   

zoek uit hoe https & TLS certificaat fixe       

theorie en andere security guidelines 

## sources

[owasp cheat sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md)

[express, bcrypt, mysql tutorial](https://medium.com/@siddarthasiddu96/user-login-and-registration-with-nodejs-using-express-bycrpt-and-mysql-529c872db5a0)
