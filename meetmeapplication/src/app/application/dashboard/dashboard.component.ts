import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationDataService } from 'src/app/sharedservices/data.service.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/sharedservices/http.service';
import { SchedulemeetComponent } from '../schedulemeet/schedulemeet.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  dataavailable!:boolean;
  user = new BehaviorSubject<any>(null);

  val :any;
  isAttendeeListEmpty:boolean = true;


  constructor(public role:ApplicationDataService, private dialog : MatDialog, private data:ApplicationDataService) {}

  ngOnInit(){

   }
  
  InviteUser()
  {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.width = '70%';

    this.dialog.open(InviteUserDialog,dialogconfig)
  }

  UploadAttendee(user:any)
   {
    this.data.selectedorganiser.next({user});
      const dialogconfig = new MatDialogConfig();
      dialogconfig.disableClose = true;
      dialogconfig.width = '70%';

      this.dialog.open(SchedulemeetComponent,dialogconfig);
  }

}

export interface Attendee {
  name: string;
  email: string;
  Date: string;
  StartTime : string;
  EndTime:string;
  Location: string;
  Organiser: string;
  OrganiserEmail:string;
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'userinvite.component.html',
  styleUrls:['../../../assets/css/bootstrap.min.css']
})
export class InviteUserDialog {
 
  constructor(private snackbar : MatSnackBar, private auth:HttpService){}

  email = new FormControl('',[Validators.required,Validators.email]);
  error:string="";

 Invite()
  {
    
    if (this.email.hasError('required')) {
      this.error = 'You must enter a value';
    }
    else if(this.email.hasError('email'))
    {
      this.error = "Not a valid email";
    }
    else if(this.email.valid)
    {
      this.auth.InviteOrganiser({email:this.email.value.trim()}).subscribe((res)=>{
       
        console.log(res);
        if(res.successfull == false)
          {
            this.snackbar.open(res.message+`${this.email.value}`,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']}); 
          }
          
          if(res.successfull == true)
          {
            this.snackbar.open(res.message ,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['success-snackbar']}); 
          }
      })

      setTimeout(()=>{

        location.reload();
      },2000)
    }
 
  }
}

