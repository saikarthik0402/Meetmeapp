import { Component, OnInit } from '@angular/core';
import { LoadingService } from './sharedservices/loading.service';


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html'
})
export class AppComponent{
  title = 'meetmeapplication';

  
  constructor(public loader : LoadingService){}


}
