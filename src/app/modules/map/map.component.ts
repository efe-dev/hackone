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
    this.eventService.addEvent({
      address: 'xx',
      category: 'concert',
      coordinates: {
        lat: coords.lat,
        lng: coords.lng
      },
      date: new Date(),
      description: 'desc',
      image: 'imageUrl',
      name: 'Event name',
      status: 'Active',
      subcategory: 'country',
      type: {
        description: 'asd',
        name: 'event'
      }
    });
  }

  public mapReady(map) {
    this.mapInstance = map;
    this.eventService.getAllEvents().then((events) => {
      for (let i=0; i<Object.keys(events.data).length; i++) {
        const event = events.data[Object.keys(events.data)[i]];
        this.markers.push({
          lat: event.coordinates.lat,
          lng: event.coordinates.lng,
          alpha: 1
        });
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
