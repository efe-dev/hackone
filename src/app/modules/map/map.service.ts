import { Injectable } from '@angular/core';
import {} from 'googlemaps';
import { environment } from '../../../environments/environment';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private static mapPromise: Promise<any>;
  private map: google.maps.Map;

  public get Map(): google.maps.Map {
    return this.map;
  }

  public static loadGoogleMaps(): Promise<any> {
    if (!MapService.mapPromise) {
      MapService.mapPromise = new Promise(resolve => {
        window.__onGapiLoaded = () => {
          console.log('Gapi loaded');
          resolve(window.gapi);
        };
        console.log('Loading google maps');
        const el = document.createElement('script');
        el.src = `https://maps.googleapis.com/maps/api/js?key=${
          environment.mapsApiKey
        }&callback=__onGapiLoaded`;
        el.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(el);
      });
    }
    return MapService.mapPromise;
  }

  public initGoogleMaps(
    element: HTMLElement,
    opts?: google.maps.MapOptions
  ): Promise<void> {
    return MapService.loadGoogleMaps().then(() => {
      this.map = new google.maps.Map(element, opts);
      console.log(this.map);
    });
  }
}
