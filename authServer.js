require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(express.json());

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

app.get("/posts",authenticateToken, (req, res) => {

  res.json(posts.filter(post => post.username === req.user.name));
});

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  //bcrypt use asynchronous library
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //bcrypt.hash(password, saltRounds) **password: The plain-text password you want to hash.saltRounds: The number of times the hashing algorithm is run. Higher numbers are more secure but slower to compute; 10 is generally a good balance.
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      //  bcrypt.compare(password, hashedPassword)    ** password: The plain-text password you want to verify. hashedPassword: The hashed password stored in the database.
      res.send("Success");
      //JWT Authentication
    } else {
      res.send("Not allowed");
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); //jwt.sign(payload, secretOrPrivateKey, [options, callback])
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
    if(err) return res.sendStatus(403)
    req.user = user;
    next();
  } )

}

app.listen(4000, () => {
  console.log("Port is running now");
});
