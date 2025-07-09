const express = require('express')
const path = require('path')
const port = 3000;
const app=express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

    const product=[
    {
        id:1,
        label:"product 1"
    },
     {
        id:2,
        label:"product 2"
    },
     {
        id:3,
        label:"product 3"
    }
]

app.get('/',(req,res)=>{
    res.render('home',{titl:"Home",products:product})
})

app.listen(port)