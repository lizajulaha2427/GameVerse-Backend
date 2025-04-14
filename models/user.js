const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number
  });
  
  const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    wishlist: [wishlistSchema]
  });

module.exports = mongoose.model('user', userSchema);
