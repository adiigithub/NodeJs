require('dotenv').config({path: require('path').resolve(__dirname,'../.env')})
const{Router}=require('express')
const adminRouter=Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {z}=require('zod')
const {AdminModel, CourseModel}=require('../db')
const adminMiddleware=require('../middleware/adminMiddleware')

const registerSchema = z.object({
  email: z.string().min(5).max(20),
  username: z.string().min(3).max(50),
  password: z.string().min(4).max(16),
});

const loginSchema = z.object({
  email: z.string().min(5).max(20),
  password: z.string().min(4).max(16)
});

adminRouter.post('/signup',async(req,res)=>{
try {
    const { username, email, password } = req.body;
    const Validation = registerSchema.safeParse(req.body);
    if (!Validation.success) {
     return res.json({
        msg: "incorrect validation",
      });
    }
    const existuser = await AdminModel.findOne({ email });
    if (existuser) {
     return res.json({
        msg: "user already exsites",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await AdminModel.create({
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

adminRouter.post('/signin', async(req,res)=>{
      const { email, password } = req.body;
    
      try {
        const Validation = loginSchema.safeParse(req.body);
        if (!Validation.success) {
         return res.json({
            msg: "incorrect validation",
          });
        }
        const finduser = await AdminModel.findOne({ email });
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
            process.env.JWT_ADMIN_SECRET
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

adminRouter.post('/course',adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    const {title,description,price,imageUrl}=req.body
    const course=await CourseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminId
    })
    res.json({
        msg:'courses are created',
        creatorId:course._id
    })
});

adminRouter.put('/course',adminMiddleware,async(req,res)=>{
const adminId=req.userId;
const {title,description,price,imageUrl,courseId}=req.body
const upDateCourse=await CourseModel.updateOne(
    {
    _id:courseId,
    courseId:adminId
    },
    {
         title,
        description,
        price,
        imageUrl,
        creatorId:adminId
})
  res.json({
        msg:'courses are created',
        creatorId:upDateCourse._id
    })


})

adminRouter.get('/course/bulk',adminMiddleware,async(req,res)=>{
    const adminId=req.userId
    const courses=await CourseModel.find({
        courseId:adminId
    })
    res.json({
        msg:"here the all courser",
        courses
    })
})
module.exports=adminRouter