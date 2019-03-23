import {IMarkerType} from "./marker-type.model";

export interface IRole {
  name: string;
  description: string;
  canShowMarkerTypes: IMarkerType[];
  canEditMarkerTypes: IMarkerType[];
  canRemoveMarkerTypes: IMarkerType[];
  canCreateMarkerTypes: IMarkerType[];
}
