import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [

  {path:"",component:AccountComponent,outlet:'dboard'}

];

@NgModule({
  declarations:[AccountComponent],
  imports: [RouterModule.forChild(routes),
  MatRadioModule],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
