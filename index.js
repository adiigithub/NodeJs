const express = require('express');
const path = require('path');
const cors=require('cors')
const app = express();



app.use((req,res,next)=>{
console.log(`${req.method} ${req.path}`)
next()
})

app.use(express.json()) 
app.use(express.static(path.join(__dirname,'/public')))

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
