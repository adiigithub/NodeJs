const {Router}=require('express')
const courseRouter=Router()
const {CourseModel,PurchaseModel}=require('../db')
const userMiddleware = require('../middleware/userMiddleware')

courseRouter.post('/purchage',userMiddleware,async(req,res)=>{
  const userId=req.userId;
  const courseId=req.body.courseId

  await PurchaseModel.create({
    userId,
    courseId
  })
  res.json({
    msg:"you are successfully bought a new course"
  })

  
})

courseRouter.get('/preview',async(req,res)=>{
   const courses=await CourseModel.find({})
   res.json({
    msg:"course preview endpoint",
    courses
   })
})

module.exports=courseRouter