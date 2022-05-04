const { SHA1 } = require('crypto-js');

class Hash 
{

   ParseData(data)
   {
   for(let fields in data){
   const value = data[fields];
      if(fields !="password"){
         data[fields] = value.toLowerCase().replace(' ','');
      }}
   return data;
   }
      
   getHash(formdata)
   {
      return new Promise((resolve) =>{

         try
         {
         let data = (this.ParseData(formdata));

         let time = new Date().getTime();
         let id = SHA1(JSON.stringify(data)+time).toString();     
         let phash = SHA1(data.password+data.email).toString();
         resolve([id,phash]);
         }
         catch(error)
         {
         console.log(error);
         }

      
      });
   }

}

module.exports = Hash;







