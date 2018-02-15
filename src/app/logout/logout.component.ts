import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operator/map';
import { AccessToken } from '../models/AccessToken';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    // alert page
  }

  backTohome(){
    this.router.navigate(['home']);
  }

  logout(){

    console.log(this.auth.getAccessToken().access_token);

    const body = new HttpParams()
      .set('access_token', this.auth.getAccessToken().access_token);

    console.log(this.auth.getAccessToken().access_token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    console.log("Logging out!");

    this.http.post<AccessToken>('http://localhost/public/api/logout', body, httpOptions).subscribe(response => {
      console.log("Loged out!");
      console.log(response);
      this.auth.deleteToken();
      this.router.navigate(['greet']);
    }, err => {
      console.log(err);
      console.log("Not loged out!");
      this.router.navigate(['greet']);

    })
  }
}
