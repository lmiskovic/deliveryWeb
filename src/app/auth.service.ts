import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AccessToken } from './models/AccessToken';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  errorMessage: string;
  accesToken: AccessToken;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) { 

  }

  saveToken(access_token: AccessToken){
    localStorage.setItem('accesToken.token_type',access_token.token_type);
    localStorage.setItem('accesToken.expires_in',access_token.expires_in);
    localStorage.setItem('accesToken.access_token',access_token.access_token);
    localStorage.setItem('accesToken.refresh_token',access_token.refresh_token);
  }

  getAccessToken(){
    this.accesToken=new AccessToken();
    this.accesToken.token_type=localStorage.getItem('accesToken.token_type');
    this.accesToken.expires_in=localStorage.getItem('accesToken.expires_in');
    this.accesToken.access_token=localStorage.getItem('accesToken.access_token');
    this.accesToken.refresh_token=localStorage.getItem('accesToken.refresh_token');
    return this.accesToken;
  }

  deleteToken(){
    localStorage.removeItem('accesToken.token_type');
    localStorage.removeItem('accesToken.expires_in');
    localStorage.removeItem('accesToken.access_token');
    localStorage.removeItem('accesToken.refresh_token');
    console.log('deleted');
  }

  isAuthorized(accesToken: AccessToken){
    const body = new HttpParams()
    .set('refresh_token', accesToken.refresh_token);

    console.log('isAuthorized' + ' ' + accesToken.refresh_token)

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.http.post<AccessToken>('http://localhost/public/api/refresh', body, httpOptions).subscribe(response =>{
      console.log('Refreshed!');
      this.accesToken=response;
      this.saveToken(this.accesToken);
      this.isLoggedIn = true;
    }, err => {
      this.errorMessage = "error";
      console.log('Not refreshed!');
      this.deleteToken;
    });
  }
}
