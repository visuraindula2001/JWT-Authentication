const exprss = require("express");
const app = exprss();

const posts = [
  { username: "Kyle", title: "Post 1" },
  { username: "Jim", title: "Post 2" },
];

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.listen(3000);
