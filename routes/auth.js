const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// GET login-signup page
router.get('/', (req, res) => {
  res.render('loginSignUp');
});

// POST signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });
  res.redirect('/');
});

// POST login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('http://127.0.0.1:52258/main.html');
  } else {
    res.send('Invalid credentials');
  }
});

// GET profile
router.get('/profile', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('profile', { user: req.session.user });
});

module.exports = router; 