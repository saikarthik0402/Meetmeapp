import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

import { UserSignup } from '../authentication/signup/interface';
import { UserLogin } from '../authentication/login/interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApplicationDataService } from './data.service.module';
import { environment } from 'src/environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';

const headers = {
    'Content-Type':  'application/json',
};

const httpOptions = {withCredentials:true,headers:headers};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private LoginerrormessageListener = new Subject<string>();
  private SignuperrormessageListener = new Subject<string>();
 

  constructor(private http:HttpClient, private cookie: CookieService, private Router: Router, public role: ApplicationDataService,
    private snackbar : MatSnackBar) { }

  isUserAuthenticated()
  {
    return this.cookie.get('userauth');
  }

async RequestData()
  {
    this.getUserDetails();
    this.getUserRole();
  }

  getLoginErrorResponse()
  {
    return this.LoginerrormessageListener;
  }

  getSignUpErrorMessage()
  {
    return this.SignuperrormessageListener;
  }

  getTemplate()
  {
   
    window.open(environment.templateurl);
  }

  getUserRole()
  {
    this.http.get<any>(environment.roleurl,httpOptions).subscribe((res)=>{
      this.role.role.next(res.role);
    })
  }

  getUserDetails()
  {
  this.http.get<any>(environment.getuserurl,httpOptions)
  .subscribe((res)=>{

    console.log(res.other);
    this.role.attendeedata.next(res.attendee);
    this.role.otheruserdata.next(res.other);
    this.role.convenordata.next(res.user);
  })
 }

  logout()
  {
    this.http.get<any>(environment.logouturl,httpOptions).subscribe();
  }

  addUser(User: UserSignup)
  {
    console.log(User);
    this.http.post<any>(environment.signupurl,User,httpOptions)
     .subscribe((response) =>{

      this.snackbar.open("New User has been created with this account","",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['success-snackbar']});
      setTimeout(()=>{
        this.Router.navigateByUrl("/login");
      },2000)    
     },
     (error:HttpErrorResponse)=>{
       this.SignuperrormessageListener.next(error.error.errormsg);
     }
     ); }
  

  ValidateUser(User : UserLogin)
  {
    console.log(User);
    this.http.post<any>(environment.loginurl,User,httpOptions)
    .subscribe(()=>{

      this.Router.navigateByUrl("/dashboard");

      this.LoginerrormessageListener.next("");
    },
    (error:HttpErrorResponse)=>{
      if(error.error.errormsg!="" || error.error.errormsg !=null)
      this.LoginerrormessageListener.next(error.error.errormsg);
    });

  }

  InviteAttendee(data:any)
  {
         this.http.post<any>(environment.attendeeurl,data,httpOptions)
         .subscribe((res)=>{
          this.snackbar.open(res.message,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['success-snackbar']});
         },
         (error:HttpErrorResponse)=>{
          if(error.error.errormsg!="" || error.error.errormsg !=null)
          this.snackbar.open(error.error.message,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['success-snackbar']});
        });
}

  InviteOrganiser(data:any)
  {
    return this.http.post<any>(environment.inviteurl,data,httpOptions);
  }

  Validateattendee(email:any)
  {
    return this.http.post<any>(environment.validateattendee,email,httpOptions);
  }

  BookSlot(data:any)
  {
    return this.http.post<any>(environment.bookslot,data,httpOptions);
  }
  
}
