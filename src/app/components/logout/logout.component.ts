import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { map } from 'rxjs/operator/map';
import { AccessToken } from '../../models/AccessToken';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit() {

  }

  backTohome(){
    this.router.navigate(['home']);
  }

  logout(){

    const body = new HttpParams()
      .set('access_token', this.auth.getAccessToken().access_token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    console.log("Logging out!");

    this.http.post<AccessToken>('http://localhost/public/api/logout', body, httpOptions).subscribe(response => {
      this.auth.handleLogout();
      this.router.navigate(['greet']);
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }
}
