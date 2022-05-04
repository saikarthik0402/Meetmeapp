const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname+'/assets/dist/meetmeapplication'));

app.get('/*',(req,res) => {

    res.sendFile(__dirname+'/assets/dist/meetmeapplication/index.html');
});

app.listen(port,(err)=>{
    if (err) console.log(err);
    console.log(`Server is running on port ${port}`);
});
