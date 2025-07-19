require('dotenv').config({path: require('path').resolve(__dirname,'../.env')})
const jwt =require('jsonwebtoken')

const adminMiddleware=(req,res,next)=>{
    const token =req.headers.token
    const decodeddata=jwt.verify(token,process.env.JWT_ADMIN_SECRET)
    if(decodeddata){
        req.id=decodeddata.id
        next()
    }else{
        res.json({
            msg:"you cant access it"
        })
    }
}
module.exports=adminMiddleware