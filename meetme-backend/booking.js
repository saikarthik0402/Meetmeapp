const dbConn = require('./database');
const sgMail=require('@sendgrid/mail') 
const ics = require('ics');

const API_KEY=
 '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';
 sgMail.setApiKey(API_KEY);

const db = new dbConn();

function GenerateTimeSlots(start, end) {
    const time = ["10:00","10:30","11:00","11:30","12:00","12:30","14:00","14:30","15:00","15:30","16:00","16:30"]
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        time.forEach(time =>{

            [hr,min] = time.split(":");
           
            let date = new Date(dt).setHours(hr,min);
    
            console.log(date);
            arr.push(new Date(date));
        })
        
        dt.setDate(dt.getDate() + 1);
    }
 return arr;
}

function ParseTimeSlots(timeslots)
{
  let availableslots = [];

  timeslots.forEach(slot=>{

      slot.timeslots.forEach((ts,index) =>{

        let dt = new Date(ts).toLocaleDateString();
        let tm = new Date(ts);

        if(index < (slot.timeslots.length-1) && tm.toLocaleTimeString()!="12:30:00 pm" && tm.toLocaleTimeString()!="4:30:00 pm")
        {
        availableslots.push({convenor:slot.user_email,cname:slot.user_fname,date:dt,starttime:tm.toLocaleTimeString(), endtime:new Date(tm.getTime()+(30*60000)).toLocaleTimeString(),meetid:slot.meetid});
        }

      })
  })


  
  return availableslots;
}

class Booking
{

  InserttoCovenorOrganiser(data,currentuserid)
  {

    return new Promise((resolve,reject)=>
      {
        console.log(data[1]);
        db.QueryToDatabase({email:data[1]})
        .then(res=>{
          console.log(res);
          if(res !=null && res !="")
          {
            console.log(res[0].user_id);
            if(res[0].user_id != currentuserid )
            {
            let insertdata =[data[0],res[0].user_id];
            db.Insert(insertdata,"InsertoConvenor").then(()=>{
              resolve([{status:200},{message:`You have successfully invited  ${data[1]} `,successfull:true}])
            })
            .catch(err=>{
              reject([{status:401},{message:"No organiser is found with this account  ",successfull:false}]);
            });
          }
          else{
            reject([{status:401},{message:"No organiser is found with this account  ",successfull:false}]);
          }    
          }
        else{
          reject([{status:401},{message:"No organiser is found with this account  ",successfull:false}]);
      }

    })
  
  });
}

  async getScheduleId(data)
  {
    return new Promise((resolve,reject)=>{
        db.FetchUser(data,"scheduleid")
        .then((res)=> resolve(res))
        .catch(err=> reject(err));
    });  
  }

  async uploadAttendee(userid,role,req)
  {
     let scheduleid;
     let user = req.body.user;
     let date = req.body.date;
     let attendee = req.body.attendee;

     console.log(user);

     try{
      scheduleid = user.user.scheduleid;
     }
     catch{
          await this.getScheduleId(userid)
          .then((res) => scheduleid = res[0].scheduleid);
     }
     attendee.forEach(async (user) => {
        user['scheduleid'] = scheduleid;  
        this.SendInvitationEmail(user.AttendeeEmail);   
     });

     let sdate = new Date(date.start);
     let edate = new Date(date.end);

     let bookings = GenerateTimeSlots(sdate,edate);

     return new Promise((resolve,reject)=>{
        db.Insert([bookings,scheduleid],"booking")
        .then(()=>{

          db.UploadAttendee(attendee)
          .then(()=>{ 
            resolve([{status:200},{message:`You have succesfully uploaded the Attendee List`}])
          }).catch(err => {throw err})
        })
        .catch(err => {
          reject([{status:401},{message:"Error Uploading the attendee List. Please Try Again:)"}]);
        })
  })
}

attendeeDetails(req)
{
  console.log(req.body);
    let email = req.body.email;
    return new Promise((resolve,reject)=>{
        db.FetchUser(email,"attendee")
        .then((res)=>{
          console.log(res.length);

          if(res.length == 0 )
          {
            resolve([{status:200},{message:"Sorry No appointments found on this email :(",isattendeefound:false}]);
          }
          
          if(res.length >=1)
          {
            resolve([{status:200},{attendee:ParseTimeSlots(res),isattendeefound:true}]);
          }
        })
        .catch((err)=>{
         
          console.log(err);
          reject([{status:401},{message:"An Error Occured. Please Try Again Later. Thank you :) "}]);
 
        })
  })
}

updateSlot(data)
{
  return new Promise((resolve,reject)=>{

    console.log(data);

     db.BookSlot(data)
     .then(res=>{
       resolve({message:"Your Slot is booked. Please check your email for confirmation"});
     })
     .catch(err=>{
       console.log(err); 
       reject([{status:401},{message:"An Error Occured. Please Try Again Later. Thank you :) "}]);

     })

  });
}

async SendInvitationEmail(email)
{
 
  const message={
          to:email,
          from : {name:'MeetMe', email:'Meetme21mur@outlook.com'},
          subject: 'Invitation for Attendee',
          html:
          `<html>

          <head>
              <style type="text/css">
                  @media screen {
                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 400;
                          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                      }

                      @font-face {
                          font-family: 'Lato';
                          font-style: normal;
                          font-weight: 700;
                          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                      }

                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 400;
                          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                      }

                      @font-face {
                          font-family: 'Lato';
                          font-style: italic;
                          font-weight: 700;
                          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                      }
                  }

                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                  }

                  table,
                  td {
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                  }

                  img {
                      -ms-interpolation-mode: bicubic;
                  }

                  /* RESET STYLES */
                  img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                  }

                  table {
                      border-collapse: collapse !important;
                  }

                  body {
                      height: 100% !important;
                      margin: 0 !important;
                      padding: 0 !important;
                      width: 100% !important;
                  }

                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: none !important;
                      font-size: inherit !important;
                      font-family: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                  }

                  /* MOBILE STYLES */
                  @media screen and (max-width:600px) {
                      h1 {
                          font-size: 32px !important;
                          line-height: 32px !important;
                      }
                  }

                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                      margin: 0 !important;
                  }
              </style>
          </head>

          <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
              <!-- HIDDEN PREHEADER TEXT -->
              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                      <td bgcolor="#FFA73B" align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                      <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                      <p style="margin: 0;">Murdoch University uses automated meeting scheduler to schedule meetings more quickly. Here is a booking invitation to schedule your meeting with the convener, use your email address to access the site.Click on the button below to schedule your meeting !</p>
                                  </td>
                              </tr>
                              <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Cheers,<br>MeetMe</p>
                              </td>
                          </tr>
                              <tr>
                              <div align="center" class="button-container" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://10.51.33.9/booking" style="height:31.5pt;width:156pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#3AAEE0"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://10.51.33.9/booking" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #3AAEE0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #3AAEE0; border-right: 1px solid #3AAEE0; border-bottom: 1px solid #3AAEE0; border-left: 1px solid #3AAEE0; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Schedule your meeting </span></span></a>
          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
          </div>
                              </tr> <!-- COPY -->
                          </table>
                      </td>
                  </tr>
                  <tr>
                  </tr>
              </table>
          </body>

</html>`
,
    
  };
      
     sgMail.send(message)
     .then((respose))
     .catch((error) => console.log(error.message));
  }
}

module.exports = Booking;