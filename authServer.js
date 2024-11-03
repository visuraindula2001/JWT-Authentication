require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());


app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //jwt.sign(payload, secretOrPrivateKey, [options, callback])
  res.json({ accessToken: accessToken });
});



app.listen(4000, () => {
  console.log("Port is running now");
});
