const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

let databaseConfig = 
  {
    host:process.env.DB_host,
    user:process.env.DB_username,
    password:process.env.DB_password ,
    database:process.env.Database,
    waitForConnections:true,
    connectionLimit : 20
  }
const pool = mysql.createPool(databaseConfig);
  

class dbConn{

    async QueryToDatabase(data)
    {
      let sql = 'select user_id,user_fname,user_lname,user_email,user_password,user_role from user where user_email = ?'

    return await pool.getConnection()
    .then(async (connection)=>{
         return await connection.execute(sql,[data.email])
        .then(([rows]) =>
        {
          connection.release();
          return JSON.parse(JSON.stringify(rows));
        })
        .catch((error)=>
        {
          throw error;
        })
    })
    .then((res)=>{
       return res;
    })
    .catch((error)=>{
     throw error;
    })

  }

    async InsertToDataBase(data)
    {
      return new Promise(async (resolve,reject) =>{
        
          let sql = "insert into user(user_id,user_fname,user_lname,user_email,user_password,user_role) values (?,?,?,?,?,?)";
            await pool.getConnection()
            .then((connection)=>{
                connection.execute(sql,[data.id,data.fname,data.lname,data.email,data.password,data.role])
                .then(()=>
                      resolve([{status:200},{msg:"New User Created"}])
                )
                .catch((error)=>{
                  
                  if(error.errno == 1062)
                  {
                    reject([{status:409},{errormsg:"User Already Exits"}]);
                  }
                  if(error.errno == 1265)
                  {
                    reject([{status:400},{errormsg:"Invalid User Role"}]);
                  }
                  console.log(error);
                                  
                })
                connection.release();
              })
              .catch((error)=>
                {
                  console.log(error);
                });
        });
      }
      
    async FetchUser(data,param,role)
      {
        let sql;
        if(param == "role")
        {
          sql = 'select user_role from user where user_id = ?'
        }
        else if(param == "fname")
        {
          sql = 'select user_fname from user where user_id = ?'
        }
        else if(param == "lname")
        {
          sql = 'select user_lname from user where user_id = ?'
        }
        else if(param == "email")
        {
          sql = 'select user_email from user where user_id = ?'
        }
        else if(param == "password")
        {
          sql = 'select user_password from user where user_id = ?'
        }
        else if(param == "user")
        {
          sql = 'select * from user where user_id = ?'
        }
        else if(param == "dashboarddata" && role == "CONVENOR")
        {
          sql =
          `
          select o.user_id, o.user_fname, o.user_lname, o.user_email,
          co.organiserid as organiserid ,c.user_fname as organiser_fname,c.user_lname as organiser_lname,c.user_email as organiser_email,
          co.invitedate, co.status,co.scheduleid,
          at.meetid, at.attendee_name,at.attendee_email,at.attendee_location,at.starttime,at.endtime,at.meetingstatus
          from user as o
          left join convenororganiser as co 
          on 
          o.user_id = co.convenorid
          left join user as c
          on 
          c.user_id = co.organiserid
          left join attendee as at
          on  
          at.scheduleid = co.scheduleid 
          group by o.user_id, o.user_fname, o.user_lname, o.user_email,co.organiserid,c.user_fname,c.user_lname,c.user_email,
          co.invitedate, co.status,co.scheduleid,
          at.attendee_name,at.attendee_email,at.attendee_location,at.starttime,at.endtime,at.meetingstatus
          having o.user_id = ?;
          `
        }
        else if(param == "dashboarddata" && role == "ORGANISER")
        {
          sql = ` select o.user_id, o.user_fname, o.user_lname, o.user_email,
          co.convenorid as organiserid ,c.user_fname as organiser_fname,c.user_lname as organiser_lname,c.user_email as organiser_email,
          co.invitedate, co.status,co.scheduleid,
          at.meetid, at.attendee_name,at.attendee_email,at.attendee_location,at.starttime,at.endtime,at.meetingstatus
          from user as o
          left join convenororganiser as co 
          on 
          o.user_id = co.organiserid 
          left join user as c
          on 
          c.user_id = co.convenorid
          left join attendee as at
          on  
          at.scheduleid = co.scheduleid and co.organiserid = co.convenorid
          group by o.user_id, o.user_fname, o.user_lname, o.user_email,co.organiserid,c.user_fname,c.user_lname,c.user_email,
          co.invitedate, co.status,co.scheduleid,
          at.attendee_name,at.attendee_email,at.attendee_location,at.starttime,at.endtime,at.meetingstatus
          having o.user_id = ?`
        }
        else if(param == "scheduleid")
        {
          sql =`SELECT scheduleid from convenororganiser where organiserid = ? `
        }
        else if(param == "attendee")
        {
          sql = `
          select at.scheduleid,at.meetid,at.meetingstatus,attendee_email,co.convenorid,o.user_fname,o.user_email
          from attendee as at
          left join convenororganiser as co
          on 
          at.scheduleid = co.scheduleid
          left join user as o
          on 
          co.convenorid = o.user_id
          left join booking as b
          on
          b.scheduleid = at.scheduleid
          group by
          at.scheduleid,at.meetid,at.meetingstatus,at.attendee_email,co.convenorid,o.user_email
          having at.attendee_email = ? and at.meetingstatus like'pending'
             ` 
        }
        else
        {
          sql ='';
        }
  
      return new Promise(async (resolve,reject)=>{

      await pool.getConnection()
      .then(async (connection)=>{
           return await connection.execute(sql,[data])
          .then((rows) =>
          {
            connection.release();
            resolve(JSON.parse(JSON.stringify(rows[0])));
          })
      })
      .then((res)=>{
         resolve(res);
      })
      .catch((error)=>
      {
        if(error.errno == 1065)
          {
             reject([{status:400},{errormsg:"Cannot Feth User Details "}]);
          }
          console.log(error);
      })
  })
}

async InserttoConvenor(data)
{
  
  let sql = `insert into convenororganiser (convenorid, organiserid) values (?, ?)`;
  
  return new Promise(async (resolve,reject) =>{
     
        await pool.getConnection()
        .then((connection)=>{
            connection.execute(sql,[data[0],data[1]])
            .then(()=>
                  resolve([{status:200},{msg:"added"}])
            )
            .catch((error)=>{
              
              reject(error);
              console.log(error);
                              
            })
            connection.release();
          })
          .catch((error)=>
            {
              console.log(error);
            });
    });
  }

async InserttoBooking(bookings) // Add All the available time
{
  let  sql = `insert into booking (timeslots,scheduleid) values ?;`

  return new Promise(async (resolve,reject) =>{
     
        await pool.getConnection()
        .then((connection)=>{
          
             connection.query(sql,[bookings],function(err){

              if(err){
                console.log(err);
              }
              else{
                resolve([{status:200},{msg:"added"}])
              }

             })

          })
          .catch((error)=>
            {
              console.log(error);
            });
    });
  }


  UploadAttendee(attendee)
  {

    let sql = "INSERT INTO attendee (attendee_name,attendee_email,attendee_location, scheduleid) VALUES (?,?,?,?)";
  
    return new Promise(async (resolve,reject)=>{
   
        await pool.getConnection()
        .then((connection)=>{

          attendee.forEach(async (user) => {
            console.log(user);
            await connection.execute(sql,[user.AttendeeName,user.AttendeeEmail,user.MeetingLocation,user.scheduleid])
            .catch(err=>console.log(err));
          })
            connection.release();
             resolve([{status:200},{msg:"Uploaded Attendee List Successfull"}]);
          })
          .catch((error)=>
           {
            console.log(error);
          });
    });

  }

  async BookSlot(data)
  {
    let sql = `UPDATE attendee SET starttime = ?, endtime = ? WHERE (meetid =  ?); `;
  
    await pool.getConnection()
    .then(async (connection)=>{
      await connection.execute(sql,[data.stime,data.etime,data.meetid])
        .then(() =>
        {
          connection.release();
        })
    })
    .catch((error)=>
    {  
      console.log(error);
    })

    }

    

  }   
module.exports = dbConn;