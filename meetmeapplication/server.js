const express = require('express');
const cors = require('cors');
const port = 4200 || process.env.port

const app = express();

app.use(express.static(__dirname+"/dist/meetmeapplication"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req,res)=>{
  res.sendFile(__dirname+"/dist/meetmeapplication/index.html");
  });


app.listen(port,(err)=>{
    if (err) console.log(err);
    console.log(`Server is running on port ${port}`);
});
