const express = require('express')
const app=express()

app.use(express.json())


function generateToken(){
    let a=["a","b","c","d","1","2","3","4"];
    let token=""
    for(let i=0;i<a.length;i++){
        token +=a[Math.floor(Math.random()*a.length)]
       
    } console.log(token)
    return token
}  
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
    const token=generateToken();
    user.token=token;
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
    let user=users.find(u=>{
        if(u.token===token){
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
