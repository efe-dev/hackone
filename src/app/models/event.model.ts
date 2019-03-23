import { IMarker } from './marker.model';

type IEventStatus = 'Active' | 'Archived' | 'Cancelled' | 'Postponed';

type IEventType = 'concert' | 'movies' | 'theater' | 'sports';

type IEventSubtype = 'rock' | 'country' | 'drama' | 'football' | 'tennis';

export interface IEvent extends IMarker {
  date: Date;
  description: string;
  image: string;
  category: IEventType;
  subcategory: IEventSubtype;
  status: IEventStatus;
}
