const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const adminSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const courseSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  creatorId: {
    type: ObjectId,
  },
});

const purchaseSchema = new Schema({
  userId: {
    type: ObjectId,
  },
  courseId: {
    type: ObjectId,
  },
});
const AdminModel = mongoose.model("Admins", adminSchema);
const CourseModel = mongoose.model("Courses", courseSchema);
const PurchaseModel = mongoose.model("Purchases", purchaseSchema);
const UserModel = mongoose.model("Users", userSchema);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};
