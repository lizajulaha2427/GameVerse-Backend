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
    res.redirect('http://127.0.0.1:50609/main.html');
  } else {
    res.send('Invalid credentials');
  }
});

// GET profile
router.get('/profile', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('profile', { user: req.session.user });
});

router.get('/wishlist', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    res.render('addToWishlist', { user: req.session.user });
  });

  router.post('/add-wishlist', async (req, res) => {
    console.log('Add to wishlist hit');
    console.log('Session user:', req.session.user); // Check if session has user
    console.log('Body:', req.body); // Check what data is being sent
  
    if (!req.session.user) {
      return res.status(401).send('Not logged in');
    }
  
    const { name, image, price } = req.body;
    const newWishlistItem = new Wishlist({
      userId: req.session.user._id,
      name,
      image,
      price
    });
  
    try {
      await newWishlistItem.save();
      res.status(200).send('Added to wishlist');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      res.status(500).send('Error adding to wishlist');
    }
  });
  
  
module.exports = router; 