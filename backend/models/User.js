cconst mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: "" }  // 🖼️ Optional image URL
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: "",
    trim: true
  },
  profilePhoto: {
    type: String,
    default: ""  // ✅ Supports base64 or hosted image URLs
  },
  orders: {
    type: [OrderItemSchema],
    default: []
  }
});

module.exports = mongoose.model("User", UserSchema);

