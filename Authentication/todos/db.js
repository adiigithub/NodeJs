const mongoose=require('mongoose')
const Schema =mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=new Schema({
    email: String,
    password: String,
    name: String
})

 const Todo=new Schema({
    title:String,
    done:Boolean, 
    UserId:ObjectId
 }) 
const UserModel=mongoose.model('Users',User)
const TodoModel=mongoose.model('Todos',Todo)

module.exports={
    UserModel,
    TodoModel
}