/// <reference types="@types/googlemaps" />
import { Component, OnInit, TemplateRef } from '@angular/core';
import { mapConfig } from './mapConfig';
import {} from 'googlemaps';
import { EventService } from 'src/app/shared/services/event.service';
import CustomMapStyles from './map.styles';
import { AppColors } from '../../models/colors.model';
import { MessageService } from '../../shared/services/messenger.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public mapStyles = CustomMapStyles;
  private availableEventTypes = [
    'sports',
    'culture',
    'music',
    'city',
    'workshop'
  ];
  private infoWindow;
  private adminActions = false;

  public map = mapConfig;
  public markers = [];
  public mapInstance;
  public firstTime = true;
  public message;
  public sampleEvents = [
    {
      address: 'Warszawska 10',
      category: {
        name: 'culture',
        color: AppColors.cyan
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description: 'This amazing event is nothing you have ever seen!',
      image: 'maybe.later',
      name: 'The Art of Hacking',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    },
    {
      address: 'Piotra Skargi 1',
      category: {
        name: 'sports',
        color: AppColors.lime
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description: 'Pełen emocji mecz transmitowany na żywo!',
      image: 'imageUrl',
      name: 'Lokalna transmisja piłki nożnej!',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    },
    {
      address: 'Tajemnicza ulica 15',
      category: {
        name: 'music',
        color: AppColors.red
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description:
        'Come and be amazed by the fact that I\'m still able to write those descriptions at 4AM',
      image: 'imageUrl',
      name: 'Ed, she run!',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    },
    {
      address: 'Pomarańczowa 67/4',
      category: {
        name: 'workshop',
        color: AppColors.purple
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description: 'Can you cook? I certainly can\'t, please send help!',
      image: 'imageUrl',
      name: 'You can cook!',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    },
    {
      address: 'Muzyczna',
      category: {
        name: 'music',
        color: AppColors.red
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description:
        'Everybody can play! We reserve the right to judge you tho...',
      image: 'imageUrl',
      name: 'Open piano at main plaza!',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    },
    {
      address: 'Reformacji 9/33',
      category: {
        name: 'workshops',
        color: AppColors.purple
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description:
        'Feeling lost? You don\'t know what going on? That\'s fine, because neither do we!',
      image: 'imageUrl',
      name: 'Get yourself sorted out!',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    },
    {
      address: 'xx',
      category: {
        name: 'city',
        color: AppColors.gold
      },
      coordinates: {
        lat: 0,
        lng: 0
      },
      date: '',
      description:
        'You have this great ideas that will make out great town even greater? That\'s great! Come and tell us.',
      image: 'imageUrl',
      name: 'Fix your city!',
      status: 'Active',
      type: {
        description: 'asd',
        name: 'event'
      }
    }
  ];
  public index = 0;

  constructor(
    public eventService: EventService,
    private messengerService: MessageService
  ) {
    this.messengerService.getMessage().subscribe(message => {
      this.showOnMap(message.text);
    });
  }

  ngOnInit() {}

  public getMarkerImageUrl(type: string = null): string {
    if (type && this.availableEventTypes.indexOf(type) > -1) {
      return type;
    }
    return 'default';
  }

  public mapClicked(map) {
    const coords = map.coords;

    const event = this.sampleEvents[this.index % 7];
    this.index++;
    event.coordinates = {
      lat: coords.lat,
      lng: coords.lng
    };
    event.date = new Date().toISOString();

    this.eventService.addEvent(event);
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
        const event = events.data;
        for (let i = 0; i < this.markers.length; i++) {
          if (this.markers[i].id === Object.keys(event)[0]) {
            const eventData = event[Object.keys(event)[0]];
            const id = Object.keys(event)[0];
            eventData.id = id;
            eventData.lat = eventData.coordinates.lat;
            eventData.lng = eventData.coordinates.lng;
            this.markers[i] = event;
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

  public showInfoPopover(info, marker) {
    this.closeInfoWindow();
    this.infoWindow = info;
    this.map.lat = marker.lat + 0.01;
    this.map.lng = marker.lng;
    info.open();
  }

  public closeInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow = null;
      this.adminActions = false;
    }
  }

  public showAdminInfoWindow(info, marker) {
    this.closeInfoWindow();
    this.adminActions = true;
    this.infoWindow = info;
    this.map.lat = marker.coordinates.lat + 0.01;
    this.map.lng = marker.coordinates.lng;
    info.open();
  }

  public deleteEvent(eventId: string): void {
    this.closeInfoWindow();
    this.eventService.deleteEvent(eventId);
  }

  public showOnMap(item) {
    this.map.lat = item.coordinates.lat;
    this.map.lng = item.coordinates.lng;
    this.map.zoom = 14;
  }
}
