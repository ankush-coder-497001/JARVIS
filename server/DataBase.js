const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Jarves");

mongoose.connection.once('open',()=>{
  console.log('connected to jarves database');
})


mongoose.connection.on('error',()=>{
  console.log('error connecting to database');
})

module.exports  = mongoose;