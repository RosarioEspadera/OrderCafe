const express = require("express");
const path = require("path");
const app = express();

// 🍰 Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// 🟢 Keep-Alive route
app.get("/ping", (req, res) => {
  res.status(200).send("OrderCafe is awake ☕");
});

// 🔐 Auth routes
// app.post("/signup", ...);
// app.post("/signin", ...);
// (Add these later as needed)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OrderCafe backend running on port ${PORT}`);
});
