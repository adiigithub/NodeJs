require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const {Router}=require("express")
const userRouter=Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel, PurchaseModel, CourseModel} = require("../db");
const { z } = require("zod");
const userMiddleware=require('../middleware/userMiddleware')


const registerSchema = z.object({
  email: z.string().min(5).max(20),
  username: z.string().min(3).max(50),
  password: z.string().min(4).max(16),
});

const loginSchema = z.object({
  email: z.string().min(5).max(20),
  password: z.string().min(4).max(16)
});


userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const Validation = registerSchema.safeParse(req.body);
    if (!Validation.success) {
     return res.json({
        msg: "incorrect validation",
      });
    }
    const existuser = await UserModel.findOne({ email });
    if (existuser) {
     return res.json({
        msg: "user already exsites",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });
    if (user) {
    return res.json({
        msg: "You Are Registerd",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const Validation = loginSchema.safeParse(req.body);
    if (!Validation.success) {
     return res.json({
        msg: "incorrect validation",
      });
    }
    const finduser = await UserModel.findOne({ email });
    if (!finduser) {
    return res.json({
        msg: "user is not found",
      });
    }
    const passwordMatched = await bcrypt.compare(password, finduser.password);
    if (passwordMatched) {
      const token = jwt.sign(
        {
          id: finduser._id.toString(),
        },
        process.env.JWT_USER_SECRET
      );
      res.json({
        token: token,
      });
    } else {
      res.json({
        msg: "invalid user",
      });
    }
  } catch (error) {
    console.log(error);
  }
});


userRouter.get('/purchases',userMiddleware,async(req,res)=>{
   const userId=req.userId

   const purchage=await PurchaseModel.find({
    userId
   })
   const courseData=await CourseModel.find({
    _id: {$in: purchage.map((x)=>x.courseId)}
   })

   res.json({
    purchage,
    courseData
   })
})


module.exports=userRouter