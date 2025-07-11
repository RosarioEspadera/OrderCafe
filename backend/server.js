const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const User = require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ☁️ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('📦 Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));


// 📝 Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// 🔐 Signin Route
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({
      message: 'Signin successful',
      user: {
        username: user.username,
        profilePhoto: user.profilePhoto || '',
        orders: user.orders || []
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Server error during signin' });
  }
});

// 💾 Update Profile & Orders
app.post('/api/user/update', async (req, res) => {
  const { username, profilePhoto, orders } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { profilePhoto, orders },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// 🔍 Fetch User Profile
app.get('/api/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// 🌐 Serve Static Files
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 🚀 Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
