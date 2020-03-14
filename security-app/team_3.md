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

1. figure out what we need

- html form for registering
- html from for log in
- write a function to check if given password complies to NIST guidelines
- connect to HIBP-API to validate with blacklist
- connection to database
- slow & salted hashing algorithm to securely store account info

1. choose development technologies

we decided to use the **Express.js** and **Node.js** framework because it's the simplest and we have the most experience with this

for the database we chose **MySQL** because we know how to use this and is open-source

**bcrypt** library for hashing and salting passwords
**express session** library for managing sessions

2. make UI web page

3. create the checks

- NIST 
- HIBP
- check if username already in database

4. slow hashing & salted


5. persist to database

- save account to database
we use parameterised queries to counter SQL-injection

1. create authentication 

be able to login / authenticate with username & password

7. deploy application 

## results



## 

herhaal express

maak html paginas       tijs

javascripts voor NIST checks        tijs

check HIBP API     hash & deel van hash door     jorg

zoek slow hashing & salting algo en zoek uit hoe ge gebruikt       tijs

express persisteren naar mysql      tijs

zoek uit hoe deployen online  (AWS educate)     jorg

zoek uit hoe https certificaat fixe         jorg

theorie en andere security guidelines tijs & jorg
