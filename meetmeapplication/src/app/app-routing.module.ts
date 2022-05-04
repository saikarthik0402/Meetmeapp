import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application/home/home.component';
import { AutheticationGuard, AuthGuard } from './sharedservices/auth.routeguard.activate';
import { AuthComponent } from './authentication/auth/auth.component';


const routes: Routes = [
  {path:'', component:AuthComponent,pathMatch:'prefix', canActivate:[AutheticationGuard],
  children: [
    {
      path:'',
      redirectTo:'/dashboard',
      pathMatch:'full'
    },
    {
      path:'login',
      loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule),
    },
    {
      path:'signup',
      loadChildren: () => import('./authentication/signup/signup.module').then(m => m.SignupModule),
    },
    {
      path:'booking',
      loadChildren: () => import('./attendee-booking/attendee-booking.module').then(m =>m.BookingModule)
    }
  ]},

  {
    path:'', component:HomeComponent, canActivate:[AuthGuard],
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path:'dashboard',
        loadChildren:()=>import('./application/dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate:[AuthGuard]
      },
      {
        path:'account',
        loadChildren:()=>import('./application/account/account.module').then(m=>m.AccountRoutingModule),
        canActivate:[AuthGuard]
      },
    ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, AutheticationGuard]
})
export class AppRoutingModule { }
