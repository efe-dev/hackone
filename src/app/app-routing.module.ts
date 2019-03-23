import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './modules/map/map.component';
import {DefaultLayoutComponent} from './modules/layout/default-layout/default-layout.component';
import {EventPageComponent} from './modules/pages/event-page/event-page.component';
import {TrafficPageComponent} from './modules/pages/traffic-page/traffic-page.component';
import {AtmospherePageComponent} from './modules/pages/atmosphere-page/atmosphere-page.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      /* MAP DEVELOPMENT */
      {
        path: 'map',
        component: MapComponent,
      },
      /* PAGES */
      {
        path: 'events',
        component: EventPageComponent
      },
      {
        path: 'traffic',
        component: TrafficPageComponent,
      },
      {
        path: 'atmosphere',
        component: AtmospherePageComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
