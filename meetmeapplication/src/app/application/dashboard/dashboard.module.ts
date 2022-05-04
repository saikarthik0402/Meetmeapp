import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,

data:{
  title:'Dashboard'
},
outlet:'dboard'
}
];

@NgModule({
  declarations:[
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
