/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { mapConfig } from './mapConfig';
import {} from 'googlemaps';
import { EventService } from 'src/app/shared/services/event.service';

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

  constructor(public eventService: EventService) {}

  ngOnInit() {}

  public mapClicked(map) {
    this.removeContextMenu();
    const coords = map.coords;
  }

  public mapReady(map) {
    this.mapInstance = map;
    this.eventService.getAllEvents().then((events) => {
      for (let i = 0; i < events.data.length; i++) {
        const event: any = events.data[i];
        const eventData = event[Object.keys(event)[0]];
        const id = Object.keys(event)[0];
        eventData.lat = eventData.coordinates.lat;
        eventData.lng = eventData.coordinates.lng;
        this.markers.push(eventData);
      }
    });
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
