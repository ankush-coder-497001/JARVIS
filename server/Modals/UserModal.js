const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone:Number,
  passowrd:{
    type:String,
    required:true,
    unique:true
  },
  whatsapp:String,
  instagram:String,
  facebook:String,
  linkedin:String,
  mailLink:String,
  leetcode:String,
  github:String
},
{timestamps:true})

module.exports = mongoose.model("USER",UserSchema);