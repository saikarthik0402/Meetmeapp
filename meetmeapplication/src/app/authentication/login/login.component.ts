import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { UserLogin } from './interface';
import { HttpService } from '../../sharedservices/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[HttpService]
})

export class LoginComponent implements OnInit {

  loginform = new FormGroup({});
  error! :string;
  isError:boolean = false; 
  errorresponse :string="";
  validationerror!:string;
  isValidationError:boolean = false;
   
 
   isclicked : boolean =false;
   constructor(private router:Router, private HttpService: HttpService, private snackbar : MatSnackBar) { }
 
   ngOnInit(): void {
     this.isclicked = false;
     
     this.loginform = new FormGroup({
   
       email : new FormControl('',Validators.required),
       password : new FormControl('',Validators.required),
     
     });
     this.HttpService.getLoginErrorResponse().subscribe((response)=>{
       if(response !="")
       {
       this.snackbar.open(response,"",{horizontalPosition:"center",verticalPosition:"top",panelClass:['warning-snackbar'],duration:5000})
       }
     });

   }
 
   login()
   {
      this.isclicked = true;
      setTimeout(()=>{
       this.router.navigateByUrl("/signup");
     },700);
   }
 
   onSubmit()
   {
     if(this.loginform.valid)
     {
        this.ValidateUser();
     }
   }
 
   ValidateUser()
     {
      let email:string = this.loginform.get('email')?.value.trim();
      let password:string = this.loginform.get('password')?.value.trim();
 
      const newUser : UserLogin = {email,password};
      console.log(newUser);
    
      this.HttpService.ValidateUser(newUser);
      
     }
 }
 