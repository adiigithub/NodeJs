const express = require("express");

const app = express();

let number_Of_Requests_For_User = {};
setInterval(() => {
  number_Of_Requests_For_User = {};
}, 1000);

app.use((req, res, next) => {
  const userId = req.headers["user-id"];
  if (number_Of_Requests_For_User[userId]) {
    number_Of_Requests_For_User = number_Of_Requests_For_User + 1;

    if (number_Of_Requests_For_User[userId] > 5) {
      res.status(404).send("no entry");
    } else {
      next();
    }
  }else{
    number_Of_Requests_For_User[userId]=1
    next()
  }
});

app.get('/request',(req,res)=>{
    res.json({number_Of_Requests_For_User})
})

app.listen(4000)