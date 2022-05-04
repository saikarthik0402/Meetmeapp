import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import {finalize, switchMap} from 'rxjs/operators'
import { LoadingService } from './loading.service';
import { HttpService } from './http.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(public loader:LoadingService, private auth:HttpService){}
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.loader.isLoading.next(true); 
        return timer(500).pipe(
            switchMap(()=>next.handle(req).pipe(
                finalize(
                    () =>{
                     this.loader.isLoading.next(false);
                    }
                )
            ))
        )
    }
}