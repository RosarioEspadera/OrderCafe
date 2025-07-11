// models/User.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePhoto: String,
  orders: [{ itemId: String, timestamp: Date }]
});
module.exports = mongoose.model("User", userSchema);
