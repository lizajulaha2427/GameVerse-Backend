const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Must match your user schema model name
    required: true
  },
  name: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
