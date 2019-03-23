import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { IEvent, DatabaseResponse } from '../../models/';

interface NewEvent {
  eventId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(public db: DatabaseService) {}

  /**
   * Adds new event to the db
   * @param event: @IEvent
   */
  public addEvent(event: IEvent): Promise<DatabaseResponse<NewEvent>> {
    return new Promise(async (resolve, reject) => {
      try {
        const { key } = await this.db
          .instance()
          .ref('events')
          .push(event);
        resolve({
          message: 'New event added',
          error: null,
          data: { eventId: key }
        });
      } catch (error) {
        reject({
          error,
          message: 'An error occured when adding new event'
        } as DatabaseResponse<{}>);
      }
    });
  }
}
