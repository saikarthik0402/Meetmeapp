const express = require('express');
const cors = require('cors');
const User = require('./User');
require('dotenv').config()
const token = require('./authentication');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Booking = require('./booking');

const port =  process.env.PORT
const app = express();
let newUser = new User();

let bookings = new Booking();

const corsoptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200 ,
  credentials:true
};

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors(corsoptions));
app.use(cookieParser())

app.use(express.static(__dirname+'/assets'));
console.log = function(){}  // Disable logs in production

app.post('/login',(req,res)=>{

console.log(req.body);
newUser.ValidateUser(req.body)
.then((response)=>{
 
  res.cookie('token',response[1],{expires:new Date(Date.now()+(parseInt(process.env.expiration)*1000)),maxAge:parseInt(process.env.expiration)*1000,httpOnly:true});
  res.cookie('userauth',"true",{expires:new Date(Date.now()+(parseInt(process.env.expiration)*1000)),maxAge:parseInt(process.env.expiration)*1000 });
  res.cookie("expiration",new Date(Date.now()+(parseInt(process.env.expiration)*1000)).toUTCString(),{expires:new Date(Date.now()+(parseInt(process.env.expiration)*1000)),maxAge:parseInt(process.env.expiration)*1000 });
  console.log(new Date(Date.now()+(parseInt(process.env.expiration)*1000)).getTime(),{expires:new Date(Date.now()+(parseInt(process.env.expiration)*1000))});
  res.status(response[0].status).json({message:"User Verified"});

})
.catch((err) =>{
  console.log(err);
  res.status(err[0].status).json(err[1]);
})
});

app.post('/signup', (req,res)=>
{  
  console.log(req.body);
  newUser.addUser(req.body)
  .then(response=>{

    res.status(response[0].status).json(response[1]);
  })
  .catch(err=>
  {
     res.status(err[0].status).json(err[1]);
  })
 
});

app.post('/upload/attendee',token.verifytoken,(req,res)=>{

  let userid = res.locals.userid;
  let role = res.locals.role;
  bookings.uploadAttendee(userid,role,req)
  .then((response)=>{
  res.status(response[0].status).json(response[1])
  })
  .catch(err=>console.log(err));
})

app.post('/bookattendeeslot',(req,res)=>{

bookings.updateSlot(req.body)
.then((response)=>{
  res.send(response)
})
.catch(err=>{
  console.log(err);
})

})

app.get('/logout',token.verifytoken,(req,res)=>{
  
  res.statusCode = 200;
  res.clearCookie('token');
  res.clearCookie('userauth');
  res.clearCookie('expiration');
  res.json({message:"User Logged Out Successfully"})
  

});

app.get('/get/role',token.verifytoken,(req,res,next)=>
{
    let role = res.locals.role;
    console.log(role);
    res.status(200).json({"role":role});
})

app.post('/invite/organiser',token.verifytoken,(req,res,next)=>{

  let userid = res.locals.userid;
  let role = res.locals.role;
  data = [userid,req.body.email,role];
  bookings.InserttoCovenorOrganiser(data)
  .then((msg)=>{
    res.send(msg[1]);
  })
  .catch(err => {
    res.send(err[1]);
  });

});

app.post('/validate/attendee',(req,res)=>{

  bookings.attendeeDetails(req)
  .then((response)=>{
    res.status(response[0].status).json(response[1])
  })
  .catch((err)=>{
    res.status(err[0].status).json(err[1]);
  })

})

app.get('/get/user',token.verifytoken,(req,res)=>{
    let userid = res.locals.userid;
    let role = res.locals.role;
    newUser.getDashboardData(userid,role)
    .then(data=>res.status(200).send(data))
    .catch(err=>{
      res.status(err[0].status).json(err[1]);
    })
}); 


app.listen(port,(err)=>{
    if (err) console.log(err);
    console.log(`Server is running on port ${port}`);
});