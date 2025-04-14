const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://127.0.0.1:49960', // or wherever you're opening main.html from
  credentials: true
}));
// Connect to MongoDB
mongoose.connect('mongodb+srv://LizaJulaha:Liza1234@cluster0.rkzcks7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false, cookie: { secure: false } }));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoutes);

// Server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
