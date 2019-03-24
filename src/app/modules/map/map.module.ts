import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map.service';
import { MapDirective } from './map.directive';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [MapDirective, MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
    NgZorroAntdModule
  ],
  providers: [MapService],
  exports: [MapDirective, MapComponent]
})
export class MapModule {}
