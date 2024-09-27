const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const mailer = require("./mailer.js");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce-application");

// app.post("/api/register", async (req, res) => {
//   console.log(req.body);
//   try {
//     await User.create({
//       name: req.body.newName,
//       email: req.body.newEmail,
//       password: req.body.newPassword,
//     });
//     res.json({ status: "ok" });
//   } catch (err) {
//     console.log(err);
//     res.json({ status: "error", error: "Duplicate email" });
//   }
// });

//Register
app.post("/api/register", async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.newEmail });
    if (existingUser) {
      return res.json({ status: "error", error: "Duplicate email" });
    }

    // Generate OTP and expiration time
    const otpCode = Math.floor(1000 + Math.random() * 9000); // Random 4-digit OTP
    // const otpExpires = new Date();
    //  otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires in 10 minutes

    // Send OTP via mail
    const mailResult = await mailer.sendOTP(req.body.newEmail, otpCode);
    if (!mailResult) {
      return res.json({ status: "error", error: "Failed to send OTP" });
    }

    // Create the user with OTP
    await User.create({
      name: req.body.newName,
      email: req.body.newEmail,
      password: req.body.newPassword,
      otp: otpCode,
    });

    res.json({ status: "ok", message: "OTP sent to email" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Registration failed" });
  }
});

//Login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  const email = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.json({ status: "ok", user: true });
  } else if (!email) {
    return res.json({ status: "email_not_exists", email: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(1337, () => {
  console.log("server started on 1337");
});
