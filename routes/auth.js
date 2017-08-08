const router = require('express').Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {

  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || user === false) {
      console.log('problem logging in', err);
      res.redirect('/login');
    }
    else {
      console.log('successful login');
      res.redirect('/home');
    }
  });


});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  console.log('body', req.body);

  const user = new User({ username: req.body.username, password: req.body.password });
  user.save((err) => {
    if (err) {
      console.log('There was an error saving the user.', err);
    }

    res.redirect('/home');
  });
});

module.exports = router;
