import { FormGroup } from "@angular/forms";

export function OverAllValidation(signup: FormGroup)
   {
      if(signup.get('email')?.errors?.email)
      {
         return {errormsg:"Invalid Email address",error:true,errortype:"email"};
      }
      else if(signup.errors?.passwordMatched == false)
      {
        return {errormsg:"Passwords does not match",error:true,errortype:"mismatch"};
      }
      else if(signup.get('password')?.errors?.passwordStrength == false)
      {
        return {errormsg:"Password must be a combination of Uppercase, Lowercase, number and a Special Character",error:true,errortype:"password"};
      }
      else{
        return {errormsg:"",error:false,errortype:""};
      }
}
