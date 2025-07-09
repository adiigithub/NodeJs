const express=require('express')
const PORT=3000;
const app=express()
app.get('/products',(req,res)=>{
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
res.send(product)
})
app.get('/products/:id',(req,res)=>{
    const productId=parseInt(req.params.id)
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
const singleProduct=product.find((product)=>product.id===productId );
if(singleProduct){
    res.json(singleProduct)
}else{
    res.send("this product is not matched ")
}
})


app.listen(PORT,()=>{
    console.log(`server are lisiting in ${PORT}`)

})