import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AccessToken } from '../../models/AccessToken';
import { RoutingConfig } from '../../app-routing';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string;
  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {

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

    this.http.post<AccessToken>('http://localhost/public/api/login', body, httpOptions).subscribe(response =>{
      console.log(response);
      this.router.navigate(['manage']);
    });

  }

  register(){

    const body = new HttpParams()
    .set('name', this.name)
    .set('email', this.username)
    .set('password', this.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post<AccessToken>('http://localhost/public/api/register', body, httpOptions).subscribe(response =>{
    });

  }
}
