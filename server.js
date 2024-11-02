const exprss = require("express");
const app = exprss();
const jwt = require("jsonwebtoken");

app.use(exprss.json())

const posts = [
  { username: "Kyle", title: "Post 1" },
  { username: "Jim", title: "Post 2" },
];

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/login", (req, res) => {
  //Authenticate User

  
});

app.listen(3000);
