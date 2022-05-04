 
 
 class globalfunc{

  toLower(object)
   {
      try {

        if(object !=null && object !="")
        {
            return Object.fromEntries(
               Object.entries(JSON.parse(JSON.parse(JSON.stringify)[0]).map(([k, v]) => [k.toLowerCase(), v])))  
        }
     else return "";
      } 
      catch (error) {
        
      }
   }
 }


 module.exports = globalfunc;
 
