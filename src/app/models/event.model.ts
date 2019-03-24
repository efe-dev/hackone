import { IMarker } from './marker.model';

type IEventStatus = 'Active' | 'Archived' | 'Cancelled' | 'Postponed';

export interface IEventCategory {
  name: string;
  color: string;
}

export interface IEvent extends IMarker {
  date: string;
  description: string;
  image: string;
  category: IEventCategory; // comma seperated
  status: IEventStatus | any;
}

export interface NewEvent {
  eventId: string;
}

export interface EventResponse {
  [eventId: string]: IEvent;
}
