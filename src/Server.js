// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // User Schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// const User = mongoose.model("User", UserSchema);

// // Register API
// app.post("/api/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, password: hashedPassword });

//   try {
//     await user.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(400).json({ error: "User already exists!" });
//   }
// });

// // Login API
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ error: "User not found!" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials!" });

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//   res.json({ message: "Login successful!", token });
// });

// // Logout API (Frontend will just clear the token)
// app.post("/api/logout", (req, res) => {
//   res.json({ message: "Logged out successfully!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found!" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials!" });
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful!", token });
  });
  
  const express = require("express");
const stripe = require("stripe")("YOUR_SECRET_KEY"); // Get from Stripe Dashboard
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.img],
          },
          unit_amount: product.price * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/order-success",
    cancel_url: "http://localhost:3000/payment",
  });

  res.json({ id: session.id });
});

app.listen(5000, () => console.log("Server running on port 5000"));
