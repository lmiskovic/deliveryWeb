import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingConfig } from '../../app-routing';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Location} from '../../models/Location';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})

export class TrackComponent implements OnInit {

  locations: Location[];  

  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
      this.updateLocations()
      setInterval(() => { this.updateLocations(); }, 5000);      
  }

  updateLocations() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.auth.getAccessToken().access_token
      })
    };

    this.http.get('http://localhost/public/api/getLastLocations', httpOptions).subscribe(response => {
      this.locations = response['data'];
      for(var i = 0; i < this.locations.length; i++){

        var coords = this.locations[i].lastLocation
               .replace(/^\(|\)$/,'')
               .split(',');
               this.locations[i].lat = Number(coords[0]);
               this.locations[i].lng = Number(coords[1]);
      }



      console.log(this.locations);
    }, err => {
      if (err.status == 401) {
        this.auth.handleUnauthorized();
      }
    })
  }
}
