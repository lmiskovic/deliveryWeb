import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AccessToken } from '../../models/AccessToken';
import { RoutingConfig } from '../../app-routing';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  name: string;
  username: string;
  password: string;
  errorMessage: string;
  access_token: AccessToken;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {

  }

  ngOnInit() {
   
  }

  login() {

    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post<AccessToken>('http://localhost/public/api/login', body, httpOptions).subscribe(

      response => {

        console.log("Loged in!");

        this.access_token = new AccessToken;

        this.access_token.token_type=response.token_type;
        this.access_token.expires_in=response.expires_in;
        this.access_token.access_token=response.access_token;
        this.access_token.refresh_token=response.refresh_token;

        this.auth.isLoggedIn = true;
        this.auth.saveToken(this.access_token);
        this.router.navigate(['home']);
    }, err => {
      this.errorMessage = "error";
      console.log("Not loged in!")
      this.auth.deleteToken();
      this.auth.isLoggedIn = false;
      this.router.navigate(['login']);
    });
  }

  register() {

    const body = new HttpParams()
      .set('name', this.name)
      .set('email', this.username)
      .set('password', this.password)
      .set('required_role', 'Dispatcher');

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post<AccessToken>('http://localhost/public/api/register', body, httpOptions).subscribe(response => {
      console.log("Registered!");
      this.router.navigate(['login']);
    }, err => {
      this.errorMessage = "error";
      console.log("Not registered!")
    })
  }
}
