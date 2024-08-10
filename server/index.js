// backend/server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./DataBase')
const app = express();
const port = 5000;
const UserRoute = require("./Routes/UserRoute");

app.use(bodyParser.json());
app.use(cors());

//routes

app.use("/User",UserRoute);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
