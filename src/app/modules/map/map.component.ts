import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public lat = 51.678418;
  public lng = 7.809007;
  public markers = [
    { lat: 22.33159, lng: 105.63233, alpha: 1, icon: {
      url: 'https://www.iflagi.pl/environment/cache/images/300_300_productGfx_c4d71e01a1233c926a472670a01597a1.jpg',
      scaledSize: {
        width: 30,
        height: 30
      }
    }},
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }
  ];
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {}
}
