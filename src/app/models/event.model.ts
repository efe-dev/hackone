import { IMarker } from './marker.model';

type IEventStatus = 'Active' | 'Archived' | 'Cancelled' | 'Postponed';

export interface IEvent extends IMarker {
  date: string;
  description: string;
  image: string;
  category: string; // comma seperated
  status: IEventStatus;
}
