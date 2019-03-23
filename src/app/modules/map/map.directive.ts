import { Directive, ElementRef } from '@angular/core';
import {} from 'googlemaps';
import { MapService } from './map.service';

@Directive({
  selector: '[appInitMap]'
})
export class MapDirective {
  public map: google.maps.Map;

  constructor(element: ElementRef, public mapService: MapService) {
    mapService.initGoogleMaps(element.nativeElement, {
      center: { lat: 50.2649, lng: 19.0238 },
      zoom: 12
    });
  }
}
