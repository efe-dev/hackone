/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { mapConfig } from './mapConfig';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map = mapConfig;
  public markers = [];

  constructor() {}

  ngOnInit() {}

  public mapClicked(map) {
    const coords = map.coords;
    this.markers.push({
      lat: coords.lat,
      lng: coords.lng,
      alpha: 1
    });
  }

  public changeView(map) {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }
}
