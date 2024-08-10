const express = require('express')
const route = express.Router();
const UserModal = require('../Modals/UserModal');



route.post('/GetUserData',async (req,res)=>{
  try {
   const User = new UserModal({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone,
    whatsapp:req.body.WhatsApp,
    instagram:req.body.Instagram,
    facebook:req.body.facebook,
    linkedin:req.body.linkedin,
    mailLink:req.body.gmaillink,
    leetcode:req.body.leetcode,
    github:req.body.github
   })
  const newUser =  await User.save();
   res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
})

route.put("/update/:uid",async (req,res)=>{
  try {
    const id = req.params.uid;
    const user = await UserModal.findByIdAndUpdate(
      id,
      {$set:req.body}
    )
   res.status(200).json("Commands Are Updated");
  } catch (error) {
    res.status(500).json(error);
  }
})

route.get("/findUser/:userid",async (req,res)=>{
  try {
    const id = req.params.userid
    const user = await UserModal.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    
  }
})


module.exports = route;