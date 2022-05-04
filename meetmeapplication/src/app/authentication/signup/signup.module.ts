import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SignupComponent } from './signup.component';


const routes: Routes = [
  {path:'',component:SignupComponent,
data:{
  title:'User Signup'
},
outlet:'auth'
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SignupModule { }
