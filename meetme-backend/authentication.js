const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
require('dotenv').config()

    const accesstoken = (data)=>
    { 
        let expiretime = parseInt(process.env.expiration);
        return jwt.sign(data ,process.env.ACCESS_KEY,{expiresIn:expiretime});
    };

    const verifytoken = (req,res,next)=>
    {
      try{
         token = req.cookies['token'].accesstoken;
         jwt.verify(token,process.env.ACCESS_KEY);
         res.locals.userid = jwt_decode(token).userid;
         res.locals.role = jwt_decode(token).role;
         next();
      }
      catch{
            res.status(403).json({errormessage:"Auth Failed"});
      }
    };

    module.exports = {accesstoken,verifytoken};
    


 
    





