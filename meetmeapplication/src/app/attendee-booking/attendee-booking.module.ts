import { NgModule } from '@angular/core';
import { AttendeeBookingComponent } from './attendee-booking.component';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {path:'',component:AttendeeBookingComponent,
  
  data:{
    title:'Booking'
  },
  outlet:'auth'
  }
];

@NgModule({ 
    imports: [RouterModule.forChild(routes),
    CommonModule],
    exports: [],
    declarations: [],
    providers: [],
})
export class BookingModule { }
