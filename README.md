# secure login application

authors:

Tijs Van den Heuvel (tijsvandenheuvel)

Jorg Vergracht  (jorgvergracht)

[link to live application](https://jorg-tijs-taak.herokuapp.com)

[link to more info](team_3.md)

## project goal

This was a school assignment for the course software security.

The task was to create a web application where

- users can register themselves with a username and password
- users can authenticate themselves using their registered username and password.

The application should securely store passwords

## setup for local hosting

1. download source code
2. terminal in security-app
3. npm install 
4. init local database
   1. in config.json stel username & password in van uw MySQL 
   2. node_modules/.bin/sequelize db:create
   3. node_modules/.bin/sequelize db:migrate
5. node app.js  of  npm start
6. open localhost:3000