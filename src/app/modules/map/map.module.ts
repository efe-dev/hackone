import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map.service';
import { MapDirective } from './map.directive';
import { MapComponent } from './map.component';


@NgModule({
  declarations: [MapDirective, MapComponent],
  imports: [CommonModule],
  providers: [MapService],
  exports: [MapDirective, MapComponent]
})
export class MapModule {}
