import {Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationDataService } from 'src/app/sharedservices/data.service.module';
import { HttpService } from 'src/app/sharedservices/http.service';


@Component({
    selector: 'ngbd-modal-confirm-autofocus',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Confirm Upload</h4>
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" mat-dialog-close>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>{{confirmtext}}</strong></p>
      <p>Please confirm before submiting the Attendee List.
      <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" mat-dialog-close>Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="submitdata()">Ok</button>
    </div>
    `
  })
  export class CnfirmationDialogComponent implements OnInit {

    constructor(private data :ApplicationDataService, private auth: HttpService) {}

    postdata!:any;
    user:any = null;
    confirmtext !:string;

    ngOnInit()
    {
        this.data.selectedorganiser.subscribe((res)=>{
  
          this.postdata = res.dt;
          if(res.user !=null && res.user != undefined && res.user !=""){
          this.user = res.user}
      
          let start = new Date(this.postdata.date.start).toLocaleDateString();
          let end = new Date(this.postdata.date.end).toLocaleDateString();


         try{
                console.log(this.user.user.USER_EMAIL);
               this.confirmtext =`You are Uploading this Attendee List on behalf of "${this.user.user.USER_EMAIL}" for date "${start}" - "${end}" for `; 
                console.log(this.confirmtext);
          }
          catch{
           
            this.confirmtext = `You are Uploading the Attendee List for date "${start}" - "${end}" `; 
            console.log(this.confirmtext);
          }

        });
    }

    submitdata()
    {
   
      let user = this.user;
      let start = this.postdata.date.start;
      let end = this.postdata.date.end;
      let date = {start,end};
      let attendee =this.postdata.user;
      let data = {user,date,attendee};

        this.auth.InviteAttendee(JSON.stringify(data))
  
        setTimeout(()=>{ window.location.reload(); },2000)
        this.data.isFileUploaded.next(null);
    
          
    }

  }
  