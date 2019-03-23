import {IMarker} from "./marker.model";

interface IEventStatus {
  name: 'Active' | 'Archived' | 'Cancelled' | 'Postponed';
}

interface IEventType {
  name: 'concert' | 'movies' | 'theater' | 'sports';
}

interface IEventSubtype {
  parent: IEventType;
  name: 'rock' | 'country' | 'drama' | 'football' | 'tennis';
}

export interface IEvent extends IMarker {
  date: Date;
  description: string;
  image: string;
  category: IEventType;
  subcategory: IEventSubtype;
  status: IEventStatus;
}
