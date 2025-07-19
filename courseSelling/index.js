require("dotenv").config();
const mongoose=require('mongoose')
const express = require("express");
const app=express()
const userRouter=require('./routes/userRoutes')
const courseRouter=require('./routes/courseRouter')
const adminRouter=require('./routes/adminRouter')

app.use(express.json())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/admin',adminRouter)


async function main() {
    await mongoose.connect(process.env.DB_Connection)
    app.listen(process.env.PORT, () => {
  console.log(`server runs in port ${process.env.PORT}`);
});
}
main()
