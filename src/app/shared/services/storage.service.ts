import { BehaviorSubject } from 'rxjs';
import { EventService } from './event.service';

export class StorageService {

  private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();

  constructor(public eventService: EventService) {
    this.eventService.listenAllEvents().subscribe((data) => {
      this.updateData(data);
    });
  }

  public updateData(data) {
    this.dataSource.next(data);
  }
}
