// 📦 Core Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// 🧠 Mongoose Schema
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
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, email, profilePhoto } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profilePhoto,
      orders: []
    });

    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "User creation failed" });
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
        email: user.email || '',
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
  const { username, profilePhoto, email, orders } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { profilePhoto, email, orders },
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


// 🌐 Static File Serving
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 🚀 Launch Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🟢 Server running on port ${PORT}`));
