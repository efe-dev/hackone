/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { mapConfig } from './mapConfig';
import {} from 'googlemaps';
import { EventService } from 'src/app/shared/services/event.service';
import storageService from '../../shared/services/storage.service';

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
  public firstTime = true;

  constructor(public eventService: EventService) {}

  ngOnInit() {}

  public mapClicked(map) {
    this.removeContextMenu();
    const coords = map.coords;
    this.eventService.addEvent({
      address: 'xx',
      category: 'music,concert,rock',
      coordinates: {
        lat: coords.lat,
        lng: coords.lng
      },
      date: new Date().toISOString(),
      description: 'desc',
      image: 'imageUrl',
      name: 'Event name',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    });
  }

  public mapReady(map) {
    this.mapInstance = map;
    this.eventService.getAllEvents().then((events) => {
      if (events) {
        for (let i = 0; i < events.data.length; i++) {
          const event: any = events.data[i];
          const eventData = event[Object.keys(event)[0]];
          const id = Object.keys(event)[0];
          eventData.id = id;
          eventData.lat = eventData.coordinates.lat;
          eventData.lng = eventData.coordinates.lng;
          this.markers.push(eventData);
        }
      }
    });
    this.eventService.listenAllEvents().subscribe((events) => {
      if (events) {
        if (!this.firstTime) {
          for (let i = 0; i < events.data.length; i++) {
            const event: any = events.data[i];
            const eventData = event[Object.keys(event)[0]];
            const id = Object.keys(event)[0];
            eventData.id = id;
            eventData.lat = eventData.coordinates.lat;
            eventData.lng = eventData.coordinates.lng;
            this.markers.push(eventData);
          }
        } else {
          this.firstTime = false;
        }
      }
    });
    this.eventService.onEventUpdate().subscribe((events: any) => {
      if (events) {
        const id = events.data.eventId;
        for (let i = 0; i < this.markers.length; i++) {
          if (this.markers[i].id === id) {
            console.log(i);
          }
        }
      }
    });
    this.eventService.onEventDelete().subscribe((events: any) => {
      if (events) {
        const id = events.data.eventId;
        for (let i = 0; i < this.markers.length; i++) {
          if (this.markers[i].id === id) {
            this.markers.splice(i, 1);
          }
        }
      }
    });
    setInterval(() => {
      this.markers = this.markers;
    });
  }

  public selectMarker(marker) {
    this.eventService.deleteEvent(marker.id);
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
