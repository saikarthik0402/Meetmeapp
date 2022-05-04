import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApplicationDataService } from '../../sharedservices/data.service.module';
import { HttpService } from '../../sharedservices/http.service';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CnfirmationDialogComponent } from './confirmation.component';


@Component({
  selector: 'app-schedulemeet',
  templateUrl: './schedulemeet.component.html',
  styleUrls: ['./schedulemeet.component.css','../../../assets/css/bootstrap.min.css']
})
export class SchedulemeetComponent implements OnInit {

  data!:string | null;
  range = new FormGroup({});
  closed : boolean = false;
  fileOutput : string = ' ';
  isclicked!:boolean;



  constructor(private auth:HttpService, public role:ApplicationDataService, private snackbar:MatSnackBar, private route: Router, private appdata :ApplicationDataService
  ,private dialog : MatDialog ) { }

  ngOnInit(): void {


    this.range = new FormGroup({
      start: new FormControl('',Validators.required),
      end: new FormControl('',Validators.required)
    });
    
  }

   GetValue()
   {
     console.log(this.range.value);
   } 

  close()
  {
    this.closed = true;
    console.log(this.closed);
  }

  downloadTemplate()
  {
    this.auth.getTemplate();
  }

  onFileDropped(event:any) {
    this.prepareFilesList(event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event:any) {
    this.prepareFilesList(event);
  }

  prepareFilesList(event:any) {

    const reader = new FileReader();
    const file = event.target.files[0];
    console.log(file.type);
    if(file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
       file.type == "application/vnd.ms-excel")
    {

      this.role.isFileUploaded.next({name:file.name,size:(file.size/1000)+" Mb"});
      console.log(this.role.isFileUploaded.value)
      reader.onload = (event) => {
        const data = reader.result;
        let workBook = XLSX.read(data, { type: 'binary' , cellDates:true });
        let jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          let data = XLSX.utils.sheet_to_json(sheet,{blankrows:false});
          return data;
        }, {});
        const dataString = JSON.stringify(jsonData);
        let attendeedata = JSON.parse(dataString);
        let sid;
        this.role.otheruserdata.subscribe((v)=>{sid = v[0]})
        let encapdata = {user:attendeedata,date:this.range.value};

        this.data = JSON.stringify(encapdata);
      }
      reader.readAsBinaryString(file);
    }
  else
  {
    this.Error("Unsupported File :( Please Upload Excel File to Proceed");
  }
}
 
 submitdata()
 {
   
    let startdt ;
    let enddt;
    let days;
          
    if(this.range.value.start !="" && this.range.value.end != "")
       {
         startdt = new Date(this.range.value.start);
         enddt = new Date(this.range.value.end);
         days = (enddt.getTime() - startdt.getTime())/(1000*3600*24);
            
            if(this.data==null || this.data =="" || this.data == undefined )
              {
                  this.Error(":( Proper Excel files should be Uploaded");
              }
              else if(JSON.parse(this.data).user.length <= 1 && JSON.parse(this.data).user[0].AttendeeName == undefined && JSON.parse(this.data).user[0].AttendeeEmail ==undefined
                      && JSON.parse(this.data).user[0].MeetingLocation == undefined)
              {
                  console.log(this.data);
                  console.log(JSON.parse(this.data).user.length);
                  console.log(JSON.parse(this.data).user[0]);

                  this.Error("Please upload the correct excel file and make sure the values are not empty :(")
              }
              else if(JSON.parse(this.data).user.length > (10*(days+1)))
              {
                this.Error("You uploaded more number of attendees than available slots. By default system only allows 10 slots per day. Please kindly adjust your schedule and reupload excel file :) :(")
              }
              else{

                let user;
                let dt = JSON.parse(this.data);
                this.appdata.selectedorganiser.subscribe(res=> user = res);
                this.appdata.selectedorganiser.next({user,dt});
            
                const dialogconfig = new MatDialogConfig();
                dialogconfig.disableClose = true;
                dialogconfig.width = '50%';

                this.dialog.open(CnfirmationDialogComponent,dialogconfig);
              }
        }
        else
        {
          this.Error("Date should not be Empty");
        }
   }
   
  
 clicked()
 {
   this.isclicked = !this.isclicked;
 }

 delete()
 {
   this.role.isFileUploaded.next(null);
   this.data = null;
 }

 Error(text:string)
 {
  this.snackbar.open(text,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']}); 
 }
}




