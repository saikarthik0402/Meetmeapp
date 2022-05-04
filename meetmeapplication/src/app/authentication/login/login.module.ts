import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule,Routes } from '@angular/router';


const routes: Routes = [
  {path:'',component:LoginComponent,
data:{
  title:'User Login'
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
export class LoginModule { }
