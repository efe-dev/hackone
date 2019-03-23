import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sirius-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email = 'user@katowice.pl';

  constructor() { }

  ngOnInit() {
  }

}
