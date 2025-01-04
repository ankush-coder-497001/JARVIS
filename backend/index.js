const express  = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const { GenerateContent } = require('./Ai');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//routes

app.post('/generate', async (req,res)=>{
  const {text} = req.body;
  try {
    const result = await GenerateContent(text);
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
})

const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})

