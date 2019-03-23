
// lat: number = 50.2649;
// lng: number = 19.0238;


interface IMarkerType {
  name: 'event' | 'project' | 'idea';
  description: string;
}

interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IMarker {
  name: string;
  type: IMarkerType;
  coordinates: ICoordinates;
  address: string;
}
