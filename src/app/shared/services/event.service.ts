import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { IEvent, DatabaseResponse } from '../../models/';

interface NewEvent {
  eventId: string;
}

interface EventResponse {
  [eventId: string]: IEvent;
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

  public getAllEvents(
    limit?: number
  ): Promise<DatabaseResponse<EventResponse>> {
    return new Promise(async (resolve, reject) => {
      try {
        const snapshot = await this.db
          .instance()
          .ref('events')
          .limitToLast(limit || 100)
          .once('value');
        resolve({
          data: snapshot.val() as EventResponse,
          error: null,
          message: 'Got events'
        });
      } catch (error) {
        reject({
          error,
          message: 'An error occured when getting events from database'
        } as DatabaseResponse<{}>);
      }
    });
  }

  public getEventById(eventId: string): Promise<DatabaseResponse<IEvent>> {
    return new Promise(async (resolve, reject) => {
      try {
        const snapshot = await this.db
          .instance()
          .ref(`events/${eventId}`)
          .once('value');
        const val = snapshot.val() as IEvent | null;
        if (val) {
          resolve({
            data: val,
            error: null,
            message: `Got event with Id: ${eventId}`
          });
        } else {
          reject({
            error: `There is no event with Id: ${eventId}`,
            message: `Couldn't find the event`
          });
        }
      } catch (error) {
        reject({
          error,
          message: 'An error occured when getting event from database'
        } as DatabaseResponse<{}>);
      }
    });
  }
}
