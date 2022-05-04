import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordStrength(): ValidatorFn 
    {
        return (control:AbstractControl) : ValidationErrors | null => {

            const value = control.value;

            if (!value) {
                return null;
            }

            const hasUpperCase = /[A-Z]+/.test(value);

            const hasLowerCase = /[a-z]+/.test(value);

            const hasNumeric = /[0-9]+/.test(value);

            const hasSymbol = /["!"#$%&'()*+,-./:;<=>?@{\\\\}^_`{|}~"[\]]+/.test(value);

            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSymbol;

            return !passwordValid ? {passwordStrength:false}: null;
        }
    }

    export function ValidatePassword(): ValidatorFn 
    {
        return (control:AbstractControl) : ValidationErrors | null => {

            let password = control.get('password')?.value;
            let repass = control.get('repass')?.value;
            let invalid!:boolean;;

           if(repass != password)
           {
              invalid = true;
           }

           return invalid ? {passwordMatched:false}: null;

           
        }
    }
