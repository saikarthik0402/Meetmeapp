import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/sharedservices/http.service';
import { ApplicationDataService } from '../sharedservices/data.service.module';

@Component({
  selector: 'app-accountmenu',
  templateUrl: './accountmenu.component.html',
  styleUrls: ['./accountmenu.component.css','../../assets/css/bootstrap.min.css']
})
export class AccountmenuComponent implements OnInit {

  constructor(private auth:HttpService, private router:Router, public role: ApplicationDataService) { }

  ngOnInit(): void {

    this.role.convenordata.subscribe(res=>console.log(res))
  }

  logout()
  {
    this.auth.logout();
    setTimeout(()=>{
      this.router.navigateByUrl("/login");
    },1000)
  }

}
