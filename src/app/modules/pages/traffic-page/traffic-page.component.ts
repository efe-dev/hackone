import { Component, OnInit } from '@angular/core';
import { mapConfig } from '../../map/mapConfig';

@Component({
  selector: 'sirius-traffic-page',
  templateUrl: './traffic-page.component.html',
  styleUrls: ['./traffic-page.component.scss']
})
export class TrafficPageComponent implements OnInit {
  public map = mapConfig;
  public trafficLayer;
  public bicycleLayer;
  public mapInstance;
  public buttons = {
    traffic: false,
    bicycle: false
  };

  constructor() { }

  ngOnInit() {
  }

  public mapReady(map) {
    this.mapInstance = map;
    this.trafficLayer = new google.maps.TrafficLayer();
    this.bicycleLayer = new google.maps.BicyclingLayer();
  }

  public showTraffic() {
    if (!this.buttons.traffic) {
      this.trafficLayer.setMap(this.mapInstance);
      this.buttons.traffic = true;
    } else {
      this.trafficLayer.setMap(null);
      this.buttons.traffic = false;
    }
  }

  public showBicycle() {
    if (!this.buttons.bicycle) {
      this.bicycleLayer.setMap(this.mapInstance);
      this.buttons.bicycle = true;
    } else {
      this.bicycleLayer.setMap(null);
      this.buttons.bicycle = false;
    }
  }

}
