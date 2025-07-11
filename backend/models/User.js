const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  profilePhoto: String,
  orders: [
    {
      name: String,
      price: Number,
      image: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
