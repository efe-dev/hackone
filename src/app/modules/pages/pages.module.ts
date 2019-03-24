import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';
import { TrafficPageComponent } from './traffic-page/traffic-page.component';
import { AtmospherePageComponent } from './atmosphere-page/atmosphere-page.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import {MapModule} from '../map/map.module';
import {FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [EventPageComponent, TrafficPageComponent, AtmospherePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule,
    MapModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
  ]
})
export class PagesModule { }
