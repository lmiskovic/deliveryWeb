import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AccessToken } from './models/AccessToken';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  errorMessage: string;
  accesToken: AccessToken;
  isLoggedIn: boolean;

  constructor(private http: HttpClient, private router: Router) {
    
    console.log(JSON.stringify(localStorage.getItem('isLoggedIn')));

    if(localStorage.getItem('isLoggedIn') === 'true'){
      console.log('IF');
      this.isLoggedIn=true;
      this.accesToken = this.getAccessToken();
      this.saveToken(this.accesToken);
      this.isAuthorized(this.accesToken);
    } else{
      console.log('ELSE');
      this.isLoggedIn = false;
      this.deleteToken();
      this.router.navigate(['login'])
    }
  }

  saveToken(access_token: AccessToken){
    localStorage.setItem('accesToken.token_type',access_token.token_type);
    localStorage.setItem('accesToken.expires_in',access_token.expires_in);
    localStorage.setItem('accesToken.access_token',access_token.access_token);
    localStorage.setItem('accesToken.refresh_token',access_token.refresh_token);
    if(this.isLoggedIn){
      localStorage.setItem('isLoggedIn','true');
    } else {
      localStorage.setItem('isLoggedIn','false');
    }
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
    localStorage.removeItem('isLoggedIn');
    console.log('Token deleted');
    this.isLoggedIn=false;
  }

  handleUnauthorized(){
    this.deleteToken();
    this.isLoggedIn=false;
    this.router.navigate(['login']);
  }
  isAuthorized(accesToken: AccessToken){
    const body = new HttpParams()
    .set('refresh_token', accesToken.refresh_token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    return this.http.post<AccessToken>('http://localhost/public/api/refresh', body, httpOptions).subscribe(response =>{
      console.log('Refreshed!');
      this.accesToken=response;
      this.isLoggedIn = true;
      this.saveToken(this.accesToken);
    }, err => {
      this.errorMessage = "error";
      console.log('Not refreshed!');
      this.deleteToken;
      this.isLoggedIn = false;
      this.router.navigate(['login']);
    });
  }
}
