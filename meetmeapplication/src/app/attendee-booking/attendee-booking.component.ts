import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'
import { ApplicationDataService } from '../sharedservices/data.service.module';
import { HttpService } from '../sharedservices/http.service';


@Component({
  selector: 'app-attendee-booking',
  templateUrl: './attendee-booking.component.html',
  styleUrls: ['./attendee-booking.component.css']
})
export class AttendeeBookingComponent implements OnInit {

  email = new FormControl('',[Validators.required,Validators.email]);
  isattedeevalid:boolean = false;
  convenor = new FormControl('',[Validators.required]);
  date= new FormControl('',[Validators.required]);
  time =new FormControl('',[Validators.required]);
  isFormFilled:boolean = false;
  
  constructor(private snackbar:MatSnackBar, private auth: HttpService, public appdata : ApplicationDataService) { }


  ngOnInit(): void {
  
  }

  Submit()
  {
    
    this.email.markAsTouched();

    if(this.email.valid)
    {
      let email = this.email.value.trim();

      if(this.isFormFilled == false)
      {
          this.auth.Validateattendee({email:email}).subscribe((res)=>{
            
            if(res.isattendeefound == true)
            {
              let convenor = new Array();
              let dates = new Array();
              let temparr = new Array();
              
              this.email.disable();
          
              res.attendee.forEach((at:any) => {

                if(convenor.indexOf(at.convenor) == -1)
                {
                convenor.push(at.convenor);
                }

                if(temparr.indexOf(at.date) == -1)
                {
                  temparr.push(at.date);
                  dates.push({convenor:at.convenor,date:at.date});
                }

              });
            
              this.appdata.availableorganisers.next(convenor);
              this.appdata.availabletimeslots.next(res.attendee);
              this.appdata.availabledates.next(dates);
              this.isattedeevalid = true;
              this.isFormFilled = true;
            }
            
            if(res.isattendeefound == false)    
            {
              this.isattedeevalid = false;
              this.snackbar.open(res.message,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']}); 
            }
          })
      }
    }

    
    if(this.isFormFilled == true)
    {
      if(!this.date.invalid && !this.time.invalid)
      {
        let booking = {};
        let timeslots = this.time?.value.split(" ");
        let dates = this.date?.value.split("/");


        let starttime = new Date(dates[1]+"/"+dates[0]+"/"+dates[2]+" "+timeslots[0]);
        let endtime = new Date((dates[1]+"/"+dates[0]+"/"+dates[2]+" "+timeslots[2]));

         booking = {email:this.email?.value.trim(),stime:starttime,etime:endtime,meetid: timeslots[4],convenorname:timeslots[5],convenoremail:timeslots[6]};

         this.auth.BookSlot(booking).subscribe((res)=>{

          this.snackbar.open(res.message,"",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['success-snackbar']}); 
          location.reload();

         })
    
      }
      else{
        this.date.markAsTouched();
        this.time.markAsTouched();

        this.snackbar.open("Please fill all the required columns to proceed","",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass:['warning-snackbar']}); 
      }
    }

  }
    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getAvailbleDates(organiser = new Array())
    {
   
      return organiser.filter(i=>i.convenor == this.convenor?.value);
    }

    getAvailableTimeSlots(slots = new Array())
    {
      return slots.filter(i=>i.convenor == this.convenor?.value && i.date == this.date?.value);
    }
  }
