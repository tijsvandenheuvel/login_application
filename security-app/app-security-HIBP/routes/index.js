var express = require("express");
var router = express.Router();

const https = require('https');
const crypto = require('crypto');

router.get('/login', function(req, res, next) {
  res.render('login', {})
});

router.get('/register', function(req, res, next) {
  res.render('register', {error: ''})
})

/* check of het pwnd is, zo ja refresh en probeer opnieuw, zo niet, ga naar / */
router.post('/register', (req, resp) => {
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
  if (found) {
    console.log(`Found ${found.count} matches! Password vulnerable!`);
    resp.render('register', {error: 'This password is found in the HIBP database. Please choose another one.'})
    
  } else {
    console.log('No matches found!');
      resp.redirect('/login')
  }

}

});




module.exports = router;
