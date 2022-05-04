import { Component, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SchedulemeetComponent } from '../schedulemeet/schedulemeet.component';
import { HttpService } from 'src/app/sharedservices/http.service';
import { ApplicationDataService } from 'src/app/sharedservices/data.service.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  toggled: boolean = false; 
  dashboard!: boolean;
  calendar!: boolean;
  account!: boolean;
  value !: string;
  scrolled:boolean = false;
  

  constructor(private router: Router, private dialog:MatDialog, private auth:HttpService, private appdata: ApplicationDataService){
    
  }

  ngOnInit(): void {
   this.toggled = false;
    
   this.auth.RequestData();
   
   setInterval(()=>{
     this.dashboard = this.calendar = this.account = false;
    if(this.router.url == "/dashboard")
    {
      this.dashboard = true;
    }
    if(this.router.url == "/calendar"){
 
     this.calendar = true;
    }
    if(this.router.url == "/account"){
 
     this.account = true;
   }
   },300)
  

  }

  onClick()
  {
    this.toggled = !this.toggled;
    console.log(this.toggled);
  }

  returnHome()
  {
  this.router.navigate(['']);
  }

 isActive(name:string)
 {
   if(name == "dashboard")
   {
      this.router.navigate(['/dashboard']);
   }
   if(name == "account"){;
    this.router.navigate(['/account']);
   }
   this.ngOnInit();

 }
 CreateMeet()
 {
   const dialogconfig = new MatDialogConfig();
   dialogconfig.disableClose = true;
   dialogconfig.width = '70%';

   this.appdata.selectedorganiser.next(null);
   this.dialog.open(SchedulemeetComponent,dialogconfig);
 }

}


