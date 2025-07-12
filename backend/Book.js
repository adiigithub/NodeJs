const express= require('express')
const app=express()


const book=[
    {
        id:1,
        product:"book 1"
    },
        {
        id:2,
        product:"book 2"
    },
        {
        id:3,
        product:"book 3"
    }
]
app.get('/',(req,res)=>{
    res.json(book)
})
app.post('/add',(req,res)=>{
    const newBook={
        id:book.length+1,
        product:`product ${book.length+1}`
    }
    book.push(newBook);
    res.json({
        data:newBook
    })

})
app.put('/update/:id',(req,res)=>{
    const currentBook=parseInt(req.params.id)
    const findCurrentBook=currentBook.find(bookid=>bookid===book.id)
    if(findCurrentBook){
        
    }
})


app.listen(4000)