import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/services/event.service';
import storageService from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public eventService: EventService) {}
  public ngOnInit() {
    this.eventService.listenAllEvents().subscribe((data) => {
      storageService.events.next(data);
    });
  }

  public async addEvent(): Promise<void> {
    try {
      const data = await this.eventService.addEvent({
        address: 'xx',
        category: 'music,concert,rock',
        coordinates: {
          lat: 50.2649,
          lng: 19.0238
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
