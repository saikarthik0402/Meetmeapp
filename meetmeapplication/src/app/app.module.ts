import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthComponent } from './authentication/auth/auth.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

import { ErrorHandlingComponent } from './error-handling/error-handling.component';

import { HomeComponent } from './application/home/home.component';
import { DashboardComponent, InviteUserDialog } from './application/dashboard/dashboard.component';
import { AccountmenuComponent } from './accountmenu/accountmenu.component';
import { SchedulemeetComponent } from './application/schedulemeet/schedulemeet.component';
import { AppInterceptor } from './sharedservices/app.httpinterceptor';

import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileuploadDirective } from './application/schedulemeet/fileupload.directive';
import { AttendeeBookingComponent } from './attendee-booking/attendee-booking.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DatepickerComponent } from './application/datepicker/datepicker.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CnfirmationDialogComponent } from './application/schedulemeet/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ErrorHandlingComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SchedulemeetComponent,
    DashboardComponent,
    AccountmenuComponent,
    FileuploadDirective,
    AttendeeBookingComponent,
    DatepickerComponent,
    InviteUserDialog,
    CnfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatStepperModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    
  
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AppInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
