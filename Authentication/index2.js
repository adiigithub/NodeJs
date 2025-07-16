const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thatisasecretkey";

const app = express();
app.use(express.json());

const users = [];
app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/public/index.html")
})

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({
    msg: "you are signedup",
  });
});
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((u) => {
    if (u.username === username && u.password === password) {
      return true;
    } else {
      return false;
    }
  });
  if (user) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    console.log(token);
  } else {
    res.status(403).json({
      msg: "invalid username or password",
    });
  }
});

const auth = (req, res, next) => {
  const token = req.headers.token;
  const decodedInformation = jwt.verify(token, JWT_SECRET);
  if (decodedInformation.username) {
    req.username=decodedInformation.username
    next();
  } else {
    res.json({
      message: "you are not logged in",
    });
  }
};

app.get("/me",auth,(req, res) => {
  let user = users.find((u) => {
    if (u.username === req.username) {
      return true;
    }
  });
  if (user) {
    res.json({
      username: user.username,
      password: user.password,
    });
  } else {
    res.json({
      msg: "invaid username",
    });
  }
});

app.listen(4444, () => {
  console.log(`server runs in port ${4444}`);
});
