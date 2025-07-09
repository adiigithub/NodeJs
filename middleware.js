const express=require("express")
const app=express()


const middle= (req,res,next)=>{
    const age =parseInt(req.params.age)
    console.log("it the age is greater then 18 then it can be access the abiut page")
    if(age>18){
        next()
    }else{
        res.send("Access denied: Age must be greater than 18")
    }
}


app.get('/',(req,res)=>{
    console.log(`access the hoome page`)
    res.send('that is a home page')
})
app.get('/about/:age',middle,(req,res)=>{
    console.log(`access the about page`)
 
    
    res.send('you are abel to access about page')
})

app.listen(3000)