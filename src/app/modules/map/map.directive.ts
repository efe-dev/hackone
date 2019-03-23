import { Directive, ElementRef } from '@angular/core';
import { MapService } from './map.service';

@Directive({
  selector: '[appInitMap]'
})
export class MapDirective {

  constructor(public mapService: MapService) {
  }
}
