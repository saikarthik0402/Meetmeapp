import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverAllValidation } from './user-signuperror';
import { ValidatePassword, passwordStrength} from './passwordValidators';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { UserSignup } from './interface';
import { HttpService } from '../../sharedservices/http.service';
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [HttpService]
})
export class SignupComponent implements OnInit {
  isclicked !: boolean;
  signupform = new FormGroup({});
  validationerror!:string;
  isValidationError:boolean = false;
  errortype!:string;

  constructor(private router :Router,private HttpService:HttpService , private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.isclicked = false;
    this.signupform = new FormGroup({
  
      fname : new FormControl('',Validators.required),
      lname : new FormControl('',Validators.required),
      email : new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password : new FormControl('',Validators.compose([Validators.required,passwordStrength(),Validators.minLength(8),Validators.maxLength(20)])),
      repass : new FormControl('',Validators.compose([Validators.required])),
      checkbox : new FormControl('',Validators.compose([Validators.required,Validators.requiredTrue])),
      accounttype: new FormControl('',Validators.required)
    },{
     validators:  ValidatePassword(),  
    }),

    this.HttpService.getSignUpErrorMessage().subscribe((response)=>{
       this.snackbar.open(response,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']}); 
    });
 
  }

  Opensnackbar(err:string)
  {
   this.snackbar.open(err,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']}); 
  }

  signup()
  {
    this.isclicked = true;
    console.log(this.isclicked);
    setTimeout(()=>{
    this.router.navigateByUrl("/login");
  },700);
  }

  onSubmit()
  {
    console.log("Submitted");
    const {errormsg,error,errortype} =  OverAllValidation(this.signupform);
    this.errortype = errortype;

    if(this.signupform.valid)
    { 
      if(!error)
      {
       this.addUser();
      }
    }
    else
    { 
      if(error){
      this.snackbar.open(errormsg,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']});
      }
      this.signupform.markAllAsTouched();
    } 
  }

  addUser()
  {
    let fname:string = this.signupform.get('fname')?.value.trim();
    let lname:string = this.signupform.get('lname')?.value.trim();
    let email:string = this.signupform.get('email')?.value.trim();
    let password:string = this.signupform.get('password')?.value.trim();
    let role:string = this.signupform.get('accounttype')?.value.trim();

    const newUser : UserSignup = {fname,lname,email,password,role};
    console.log(newUser);
    this.HttpService.addUser(newUser);
  }

}

