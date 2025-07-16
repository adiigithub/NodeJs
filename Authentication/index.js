const express = require('express')
const app=express()

app.use(express.json())


const users=[];

 
app.post('/signup',(req,res)=>{
const username=req.body.username
const password=req.body.password

users.push({
    username:username,
    password:password
})

res.json({
    msg:"you are signedup"
})
})

app.post('/signin',(req,res)=>{
const username=req.body.username
const password=req.body.password

const user=users.find((u)=>{
    if(u.username===username&&u.password===password){
        return true
    }else{
        return false
    }
})
if(user){
    const token=jwt.sign({
        username:username
    },JWT_SECRET);
    
    res.json({
        token:token
    })
}else{
    res.status(403).send({
        msg:"invailid user name or password"
    })
}
    
})

app.get('/me',(req,res)=>{
    const token = req.headers.token
    const decodedInformation=jwt.verify(token,JWT_SECRET)
    const username=decodedInformation.username
    let user=users.find(u=>{
        if(u.username===username){
            return true
        }
    })
    if(user){
        res.json({
            username:user.username,
            password:user.password
        })
    }else{
        res.json({
            msg:"token invalid"
        })
    }
})



app.listen(3000,()=>{
    console.log(`server run in ${3000}`);
    
})
