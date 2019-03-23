/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { mapConfig } from './mapConfig';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('contextMenu') contextMenu: ElementRef;

  public map = mapConfig;
  public markers = [];
  public mapInstance;

  constructor() {}

  ngOnInit() {}

  public mapClicked(map) {
    this.removeContextMenu();
    const coords = map.coords;
    this.markers.push({
      id: 1,
      title: 'xd',
      lat: coords.lat,
      lng: coords.lng,
      alpha: 1
    });
  }

  public mapReady(map) {
    this.mapInstance = map;
  }

  public selectMarker(marker) {
    console.log(marker);
  }

  public markerOptions(id) {
    const e: any = window.event;
    const element = this.contextMenu.nativeElement;
    element.style.top = e.clientY + 'px';
    element.style.left = e.clientX + 'px';
    element.style.display = 'block';
  }

  public removeContextMenu() {
    const element = this.contextMenu.nativeElement;
    element.style.display = 'none';
  }

  public click() {
    this.setToTrafficLayer();
  }

  public setToTrafficLayer() {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.mapInstance);
  }
}
