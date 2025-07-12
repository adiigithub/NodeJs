const express=require("express")
const app=express()

const checkAge= (req,res,next)=>{
     const age=req.query.age
     if(age>=14){
         next()
    }else{
        res.json({msg:"you are not abel"})
    }
}
let request=0
app.use((req,res,next)=>{
    request=request+1
    next()
})
// app.use(checkAge)


app.get('/ride1',(req,res)=>{
    res.json({
        msg:"that is a aussament park"
    })
})

app.get('/request',(req,res)=>{
    res.json({request})
})

app.listen(5000)