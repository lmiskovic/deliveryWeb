import { Component, OnInit } from '@angular/core';
import { RoutingConfig} from '../../app-routing';
import { AuthService} from '../../auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AccessToken } from '../../models/AccessToken';
import { Delivery } from '../../models/Delivery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  deliveries: Delivery[];
  userNames: string[];
  newDelivery: Delivery;

  user_id: string;
  deliveryAddress: string;
  customerName: string;
  contactPhoneNumber: string;
  note: string;

  constructor(private auth: AuthService, private http:HttpClient, private router:Router) { }

  ngOnInit() {
    this.newDelivery = new Delivery;
    this.getAllDeliveries();
    this.getDriverNames();
  }

  getDriverNames(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.get('http://localhost/public/api/getDriverNames', httpOptions).subscribe(response => {
      this.userNames = response['data'];
      for (var i = 0; i < this.userNames.length; i++) {
        console.log(this.userNames[i]);
      }
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }

  getAllDeliveries() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.get('http://localhost/public/api/deliveriesAll', httpOptions).subscribe(response => {
      console.log("deliveriesAll successfull");
      this.deliveries = response['data'];
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }
  
  createDelivery(){

    const body = new HttpParams()
      .set('user_id', this.user_id)
      .set('deliveryAddress', this.newDelivery.deliveryAddress )
      .set('customerName', this.newDelivery.customerName )
      .set('contactPhoneNumber', this.newDelivery.contactPhoneNumber )
      .set('note', this.newDelivery.note );

      console.log('id: ' + this.user_id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.post('http://localhost/public/api/createDelivery', body, httpOptions).subscribe(response => {
      console.log(response);
      this.getAllDeliveries();
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }
}
