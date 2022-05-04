import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    isauth !: boolean
    constructor(private auth : HttpService, private route : Router) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean | Observable<boolean> | Promise<boolean> {

            this.isauth = !!this.auth.isUserAuthenticated() && this.auth.isUserAuthenticated()=="true";


            if(!this.isauth)
            {
            this.route.navigateByUrl("/login");
            }
            return this.isauth;
            }
}


@Injectable({providedIn: 'root'})
export class AutheticationGuard implements CanActivate {
    
    constructor(private auth : HttpService, private route : Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return new Promise<boolean>(resolve=>{

            let userauth = this.auth.isUserAuthenticated();
  
             if(!userauth)
             {
                 resolve(true);
             }
             else{
                if(state.url == "/login" || state.url =="/signup" || state.url == "/verifyemail" || state.url =="/resetpassword")
                {
                   this.route.navigateByUrl("/dashboard");
                }
             }
            })
    }
}