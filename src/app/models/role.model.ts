import {IMarkerType} from './marker.model';

export interface IRole {
  name: string;
  description: string;
  canShowMarkerTypes: IMarkerType[];
  canEditMarkerTypes: IMarkerType[];
  canRemoveMarkerTypes: IMarkerType[];
  canCreateMarkerTypes: IMarkerType[];
}
