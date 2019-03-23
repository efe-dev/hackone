import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { IEvent, DatabaseResponse, NewEvent, EventResponse } from '../../models/';
import { Observable } from 'rxjs';

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
    console.log(event);
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

  public listenAllEvents(): Observable<DatabaseResponse<EventResponse[]>> {
    return new Observable(observer => {
      try {
        this.db
          .instance()
          .ref('events')
          .on('value', snapshot => {
            if (snapshot.val()) {
              const events: EventResponse[] = [];
              const availableEvents = snapshot.val();
              Object.keys(availableEvents).map((key: string) => {
                events.push({ [key]: availableEvents[key] });
              });
              observer.next({
                data: events,
                message: 'Got events',
                error: null
              });
            } else {
              // little hack
              observer.next({
                data: [],
                message: '',
                error: null
              });
            }
          });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * Gets all events if no limit specified
   * @param limit: @number (optional)
   */
  public getAllEvents(
    limit?: number
  ): Promise<DatabaseResponse<EventResponse[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const events: EventResponse[] = [];
        const snapshot = await this.db
          .instance()
          .ref('events')
          .limitToLast(limit || 100)
          .once('value');

        if (snapshot.val()) {
          const availableEvents = snapshot.val();
          Object.keys(availableEvents).map((key: string) => {
            events.push({ [key]: availableEvents[key] });
          });
          resolve({
            data: events,
            message: 'Got events',
            error: null
          });
        } else {
          // little hack
          resolve({
            data: events,
            message: '',
            error: null
          });
        }
      } catch (error) {
        reject({
          error,
          message: 'An error occured when getting events from database'
        } as DatabaseResponse<{}>);
      }
    });
  }

  /**
   * Gets event by given id
   * @param eventId: @string
   */
  public getEventById(eventId: string): Promise<DatabaseResponse<IEvent>> {
    return new Promise(async (resolve, reject) => {
      try {
        const snapshot = await this.db
          .instance()
          .ref(`events`)
          .child(eventId)
          .once('value');
        const val = snapshot.val() as IEvent | null;
        if (val) {
          resolve({
            data: val,
            error: null,
            message: `Got event with id: ${eventId}`
          });
        } else {
          reject({
            error: `There is no event with id: ${eventId}`,
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

  /**
   * Deletes event by given id
   * @param eventId: @string
   */
  public deleteEvent(eventId: string): Promise<DatabaseResponse<{}>> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db
          .instance()
          .ref(`events`)
          .child(eventId)
          .remove();
        resolve({
          error: null,
          data: {},
          message: `Deleted event with id: ${eventId}`
        });
      } catch (error) {
        reject({
          error,
          message: 'An error occured when deleting event from database'
        } as DatabaseResponse<{}>);
      }
    });
  }

  /**
   * Updates event by id
   * @param eventId: @string
   * @param value: @IEvent
   */
  public updateEvent(
    eventId: string,
    value: IEvent
  ): Promise<DatabaseResponse<IEvent>> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.db
          .instance()
          .ref('events')
          .child(eventId)
          .update(value);
        resolve({
          error: null,
          data: value,
          message: `Event with id: ${eventId} updated successfully`
        });
      } catch (error) {
        reject({
          error,
          message: `An error occured when updating event with id: ${eventId}`
        } as DatabaseResponse<{}>);
      }
    });
  }
}
