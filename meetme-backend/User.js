const dbConn = require('./database');
const Hash = require('./hash');
const token = require('./authentication')
const validator = require('validator');


const db = new dbConn();
const hash = new Hash();

function getUser(User)
{
  return db.QueryToDatabase(hash.ParseData(User))
  .then((response) =>{
      
      if(response == null || response == "")
      {
        return null;
      }
      else{
         return response;
      }
  })
  .catch((error)=>{

    console.log(error);
    console.log("Invalid Paramaters");

  });
}

function ValidateFormData(User)
{
  if (validator.isEmail(User.email) && !validator.isEmpty(User.email) && !validator.isEmpty(User.fname)
   && !validator.isEmpty(User.lname) && !validator.isEmpty(User.password) && validator.isStrongPassword(User.password) && !validator.isEmpty(User.role))
  {
    return true;
  }else{return false};
}

class User {

  ValidateUser(User)
    {
        return new Promise((resolve,reject)=>{
            let response = getUser(User);
            let user = hash.ParseData(User);
        
                response
                .then((res) =>{    
                    let data = JSON.parse(JSON.stringify(res));
                    hash.getHash(user)
                    .then(([id,phash])=>{
                
                            if(data == null || phash != data[0].user_password)
                            {
                                reject([{status:401},{errormsg:"Invalid Username or Password"}]);
                            }
                            else
                            {
                              resolve([{status:200},{accesstoken:token.accesstoken({userid:data[0].user_id,role:data[0].user_role})}]);
                              console.log("User Verified");
                            }
                    })
                })
                .catch(err=>{

                  console.log(err);
                })
                
       });
    }
    
  addUser(User)
  {
    const validform = ValidateFormData(User);
    console.log(validform);
    return new Promise((resolve,reject)=>{
     
    if(validform)
    {
      hash.getHash(User)
      .then(([id,phash])=>{
          User["id"] = id;
          User["password"] = phash;
      }).then(()=>{
      
          db.InsertToDataBase(User)
          .then((response)=>
          {
            resolve(response);
          })
          .catch((error)=>{
               reject(error);  
          })
      })
    } 
    else{
      reject([{status:400},{errormsg:"Invalid Form Data"}]);
    } 
   
  })
 }
 getUserDetails(userid,param)
 {
  return new Promise((resolve,reject)=>{

  db.FetchUser(userid,param)
  .then((response) =>{
       resolve({data:response});
     })
  .catch(()=>{
    reject([{status:400},{errormsg:"Cannot fetch User Details"}]);
  });

  });
 }

 getDashboardData(userid,role)
 {
  return new Promise((resolve,reject)=>{

    db.FetchUser(userid,"dashboarddata",role)
    .then(userdata=>{
     
        console.log(userdata);

        let data = {};
        data['user'] ={};
        data['other'] = [];
        data['attendee'] =[];
    
        data.user = {USERID:userdata[0].user_id,USER_FNAME:userdata[0].user_fname,USER_LNAME:userdata[0].user_lname,USER_EMAIL: userdata[0].user_email};

        try{
         
          let sid = [];
          userdata.forEach((user) =>{
    
            if((user.scheduleid !=null && user.scheduleid!=undefined))
            {

              if((user.organiserid != user.user_id) && sid.indexOf(user.scheduleid) == -1)
              {
                let dt = {USER_ID:user.organiserid,USER_FNAME:user.organiser_fname,USER_LNAME:user.organiser_lname,USER_EMAIL:user.organiser_email,date:new Date(user.invitedate).toDateString(),status:user.status,scheduleid:user.scheduleid,TimeStamp:user.invitedate};
                data.other.push({USER_ID:user.organiserid,USER_FNAME:user.organiser_fname,USER_LNAME:user.organiser_lname,USER_EMAIL:user.organiser_email,date:new Date(user.invitedate).toDateString(),status:user.status,scheduleid:user.scheduleid,TimeStamp:user.invitedate});
                sid.push(dt.scheduleid);
              }
            if(user.meetid !=null && user.meetid != undefined){

              let mdate = new Date(user.starttime);
              let stime = new Date(user.starttime);
              let etime = new Date(user.endtime);

              let dt = mdate.toDateString();
              let st = stime.getHours() + ":" + stime.getMinutes();
              let et = etime.getHours() + ":" + etime.getMinutes();

              data.attendee.push({name:user.attendee_name,email:user.attendee_email,location:user.attendee_location,date: dt ,starttime:st ,endtime:et,meetingstatus:user.meetingstatus,ORGANISERNAME:user.organiser_fname+" "+user.organiser_lname,ORGANISEREMAIL:user.organiser_email});
            }else {}
          }else{ console.log("No")}
        })
          resolve(data);
          console.log(data); 
        }
        catch(error){
         console.log(error)
        }
      })
       .catch(err=>
        {
          console.log(err);
          reject([{status:400},{errormsg:"Cannot fetch User Details"}]);
        });
 
   })    
 }

}

   
module.exports = User;