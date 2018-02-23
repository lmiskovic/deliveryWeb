import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { UsernameIdPair } from '../../models/UsernameIdPair';
import { Stats } from '../../models/Stats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usernames: UsernameIdPair[];
  stats: Stats;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getDriverNames();
    this.getDeliveryCounts();
  }

  getDriverNames(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.get<UsernameIdPair>('http://localhost/public/api/getDriverNames', httpOptions).subscribe(response => {
      this.usernames = response['data'];
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }

  getDeliveryCounts(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.get<Stats>('http://localhost/public/api/getDeliveryCounts', httpOptions).subscribe(response => {
      this.stats = response['data'];
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }

}
