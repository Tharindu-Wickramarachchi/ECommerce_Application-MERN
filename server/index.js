const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce-application");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.newName,
      email: req.body.newEmail,
      password: req.body.newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

// app.post('/api/login', async (req,res) =>{
//     const user = await User.findOne({
//         email: req.body.email,
//         password: req.body.password,
//     })

//     if (user){
//         return res.json({status: 'ok', user: true})
//     }else{
//         return res.json({status: 'error', user: false})
//     }
// })

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
