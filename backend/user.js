const express= require('express')
const PORT=5000
const user=require('./MOCK_DATA.json')
const fs=require('fs')
const app=express()

app.use(express.json())

app.get('/api/user',(req,res)=>{
    res.json(user)
})
app.get('/users',(req,res)=>{
    const html=`
    <ul>
    ${user.map(users=> `<li>${users.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})
app.get('/api/user/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const findUser=user.find(user=>user.id===id)
    res.json(findUser)
})
app.post('/api/user',(req,res)=>{
    const body=req.body;
    user.push({id:user.length+1,...body})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(user),(err,data)=>{
        return res.json({status:"pending",data:data})
    })
})
app.patch('/api/user/:id',(req,res)=>{
const userId=parseInt(req.params.id);
const update=req.body
const findUser=user.find(u=>u.id===userId)
user[findUser]={...user[findUser],...update}
  fs.writeFile("./MOCK_DATA.json",JSON.stringify(user,null,2),(err,data)=>{
        return res.json({status:"pending",data:data})
    })

})


app.listen(PORT,()=>{
    console.log(`server listen in ${PORT}`);
    
})