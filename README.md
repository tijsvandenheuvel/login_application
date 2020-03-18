# secure login application

authors:
Tijs Van den Heuvel (tijsvandenheuvel)
Jorg Vergracht  (jorgvergracht)

[link to live application](https://jorg-tijs-taak.herokuapp.com)

[link to more info](https://github.com/tijsvandenheuvel/team_3_secure_login/../../../../team_3.md)

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