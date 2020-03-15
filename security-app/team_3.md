# security app document

authors:
Tijs Van den Heuvel
Jorg Vergracht

[link to source code]()
[link to application]()

## assignment

a web application where 
- users can register themselves with a username and password
- users can authenticate themselves using their registered username and password. 

the application should store passwords

passwords conforms to NIST guidelines
[doc](https://pages.nist.gov/800-63-3/sp800-63b.html) section 5.1.1.1

the passwords from [HIBP](https://haveibeenpwned.com/) should be used as blacklist (list of 555,278,657 compromised passwords)

use security guidelines as learned in class

deploy application 

## development steps

1. figure out scope & work

   - html login & register page
   - check if given password complies to NIST guidelines
   - connect to HIBP-API to validate with blacklist
   - connection to database 
   - implement slow & salted hashing algorithm bcrypt
   - session mgmt
   - https connection with TLS certificate

2. choose main development technologies

we decided to use the **Express.js** and **Node.js** framework because it's the simplest and we have the most experience with this

for the database we chose **MySQL** because we know how to use this and is open-source

**bcrypt** library/algorithm for hashing and salting passwords


1. make front end web page
    create html login & registering forms
    with **ejs** templating engine
    execute database setup in MySQL

2. establish secure connection
    only send passwords using strong transport: **TLS** + **https**
    this ensures encrypted session ID token

3. create authentication middleware
    create Express.js file (login.js) for middleware
    establish connection with **MySQL** database

    be able to login / authenticate with username & password

    make username case insensitive
    
4. slow hashing & salted
    use **bcrypt** library for hashing & salting
    >implement BCrypt hash 

5. write database connection & queries
    authenticate by checking username & password in database
    - check if username is in db
    - check if username & hashedpassword are same as in database
    - post username & hashedpassword
  
    use **sequelize** for programming queries
    we use parameterised queries to counter SQL-injection

    > use generic error messages

6. create the checks
   - NIST (passwoord tussen 8 en 64 tekens)
   - HIBP: eerst hashen en dan check met API 
  
    > use generic error messages

7. authorization
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
    

8. deploy application 
    > get HTTPS, TLS certificate
    search & get free host provider

## results

### application flow
1. manage session 
    - cookies
    - tokens

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

## 

herhaal express

maak html paginas       

javascripts voor NIST checks        tijs

check HIBP API     hash & deel van hash door     jorg

zoek slow hashing & salting algo en zoek uit hoe ge gebruikt       tijs

express persisteren naar mysql      tijs

zoek uit hoe deployen online  (AWS educate)     jorg

zoek uit hoe https certificaat fixe         jorg

theorie en andere security guidelines tijs & jorg

## sources

[owasp cheat sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Authentication_Cheat_Sheet.md)