/// <reference types="@types/googlemaps" />
import { Component, OnInit, TemplateRef, HostListener } from '@angular/core';
import { mapConfig } from './mapConfig';
import {} from 'googlemaps';
import { EventService } from 'src/app/shared/services/event.service';
import {
  NzMenuDirective,
  NzDropdownContextComponent,
  NzDropdownService
} from 'ng-zorro-antd';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private contextMenu: NzDropdownContextComponent;
  private currentMouseEvent: MouseEvent;

  public map = mapConfig;
  public markers = [];
  public mapInstance;
  public firstTime = true;

  constructor(
    public eventService: EventService,
    private dropdownService: NzDropdownService
  ) {}

  ngOnInit() {}

  public mapClicked(map) {
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
    this.eventService.getAllEvents().then(events => {
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
    this.eventService.listenAllEvents().subscribe(events => {
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

  public click() {
    this.setToTrafficLayer();
  }

  public setToTrafficLayer() {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(this.mapInstance);
  }

  public showContextMenu($event, template: TemplateRef<void>): void {
    this.dropdownService.dispose();
    setTimeout(() => {
      console.log(this.currentMouseEvent, template);
      this.contextMenu = this.dropdownService.create(this.currentMouseEvent, template);
    }, 200);
  }

  public closeContextMenu(event: NzMenuDirective): void {
    console.log(event);
    console.log('context menu event', event);
  }

  @HostListener('click', ['$event'])
  public onMouseClick(event: MouseEvent): void {
    this.currentMouseEvent = event;
  }
}
