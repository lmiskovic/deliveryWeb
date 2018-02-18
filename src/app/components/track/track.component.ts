import { Component, OnInit, ViewChild  } from '@angular/core';
import { RoutingConfig} from '../../app-routing';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 44.1116606;
  lng: number = 15.2673023;

  constructor() { }

  ngOnInit() {
    
  }

}
