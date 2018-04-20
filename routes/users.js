const express = require('express');
const User = require('../models/user');
const router = express.Router();

require('../db');

const parser = require('body-parser').urlencoded({extended: false});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/signup', parser, (req, res)=>{
  const {email, password, name} = req.body;
  User.signUp(email, password, name)
  .then(()=> res.status(201).send('Dang ky thanh cong'))
  .catch((err)=> res.status(401).send('Dang ky that bai'+ err.message));
});

router.post('/signin', parser, (req, res) => {
  const {email, password} = req.body;
  User.signIn(email, password)
  .then(user => {
    req.user = {email, name: user.name};
    res.status(200).send('Dang nhap thanh cong');
  })
  .catch((err) => res.status(401).send('Dang nhap that bai' + err.message));
})

module.exports = router;
