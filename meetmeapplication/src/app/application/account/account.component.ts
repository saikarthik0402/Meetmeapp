import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from 'src/app/sharedservices/data.service.module';
import { HttpService } from 'src/app/sharedservices/http.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css',]
})
export class AccountComponent implements OnInit {

  constructor(private auth:HttpService,public role: ApplicationDataService) { }

  ngOnInit(): void {

  

  
  }


}
