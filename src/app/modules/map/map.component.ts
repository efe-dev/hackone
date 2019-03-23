import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlPosition, MapTypeId } from '@agm/core/services/google-maps-types';
import { mapConfig } from './mapConfig';

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
}
