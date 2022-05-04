import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isauthenticated!:string;

  constructor(private router :Router, private cookie:CookieService) { }

  ngOnInit(): void {
    this.isauthenticated = this.cookie.get('userauth');
  }


}
