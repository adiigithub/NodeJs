const express = require("express");
const PORT = 5000;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thatisasecerettoken";
const { UserModel, TodoModel } = require("../todos/db");
const { default: mongoose } = require("mongoose");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/NewToDo");


app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.insertMany({
    email: email,
    password: password,
    name: name,
  });
  res.json({
    msg: "you are loggedin"
  });
});


app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  }
});

const auth=(req,res,next)=>{
    const token=req.headers.token
    const decodeData=jwt.verify(token,JWT_SECRET)

    if(decodeData){
        req.userId=decodeData.id
        next()
    }else{
        res.status(403).json({
            msg:"you are invalid user for access it "
        })
    }
}


app.post("/todo",auth,async(req, res) => {
    const userId=req.userId
    const title=req.body.title

   await TodoModel.insertMany({
        title,
        userId
    })

    res.json({
        userId:userId
    })
});


app.get("/todos",auth, async(req, res) => {
    const userId=req.userId
    const todos=await TodoModel.find({
        userId
    })
    res.json({
        userId:userId
    })
});

app.listen(PORT, () => {
  console.log(`the server runnig in ${PORT}`);
});


