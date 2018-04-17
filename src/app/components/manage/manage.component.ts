import { Component, OnInit } from '@angular/core';
import { RoutingConfig} from '../../app-routing';
import { AuthService} from '../../auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AccessToken } from '../../models/AccessToken';
import { Delivery } from '../../models/Delivery';
import { Router } from '@angular/router';
import { UsernameIdPair } from '../../models/UsernameIdPair';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit {

  deliveries: Delivery[];
  usernames: UsernameIdPair[];
  newDelivery: Delivery;
  statuses: string[];
  status: string;
  user_id: string;
  deliveryAddress: string;
  customerName: string;
  contactPhoneNumber: string;
  note: string;

  constructor(private auth: AuthService, private http:HttpClient, private router:Router) { }

  ngOnInit() {
    this.statuses = ['Delivered','In progress', 'Canceled'];
    this.newDelivery = new Delivery;
    this.getAllDeliveries();
    this.getDriverNames();
  }

  onChangeStatus(event){
    this.status = event.target.value;
  }

  onChangeDriver(event, i){
    //this.deliveries[i].user_id = event.target.value;
  }

  updateDelivery(delivery: Delivery){
    const body = new HttpParams()
      .set('id', delivery.id)
      .set('status', delivery.status)
      .set('user_id', delivery.user_id )
      .set('deliveryAddress', delivery.deliveryAddress )
      .set('contactPhoneNumber', delivery.contactPhoneNumber )
      .set('customerName', delivery.customerName )
      .set('note', delivery.note );

      console.log('id', delivery.id)
      console.log('status', delivery.status)
      console.log('user_id', delivery.user_id )
      console.log('deliveryAddress', delivery.deliveryAddress )
      console.log('contactPhoneNumber', delivery.contactPhoneNumber )
      console.log('customerName', delivery.customerName )
      console.log('note', delivery.note );

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.post('http://139.162.132.207/api/updateDelivery', body, httpOptions).subscribe(response => {
      console.log(response);
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }

  getDriverNames(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.get<UsernameIdPair>('http://139.162.132.207/api/getDriverNames', httpOptions).subscribe(response => {
      this.usernames = response['data'];
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

    this.http.get<Delivery[]>('http://139.162.132.207/api/deliveriesAll', httpOptions).subscribe(response => {
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
      .set('status', 'In progress' )
      .set('contactPhoneNumber', this.newDelivery.contactPhoneNumber )
      .set('note', this.newDelivery.note );

      console.log('id: ' + this.status);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.post('http://139.162.132.207/api/createDelivery', body, httpOptions).subscribe(response => {
      this.newDelivery = new Delivery;
      this.getAllDeliveries();
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }

  deleteDelivery(delivery: Delivery){
    const body = new HttpParams()
      .set('id', delivery.id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.post('http://139.162.132.207/api/deleteDelivery', body, httpOptions).subscribe(response => {
      console.log(response);
      this.getAllDeliveries();
    }, err => {
      if (err.status==401){
        this.auth.handleUnauthorized();
      }
    })
  }
}
