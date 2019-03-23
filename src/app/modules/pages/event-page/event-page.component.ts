import { Component, OnInit } from '@angular/core';
import {AppColors} from '../../../models/colors.model';

interface ICategory {
  name: string;
  color: string;
  selected: boolean;
}

@Component({
  selector: 'sirius-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  categories: ICategory[];

  constructor() {
    this.categories = [
      {
        name: 'music',
        color: AppColors.purple,
        selected: true,
      },
      {
        name: 'sport',
        color: AppColors.lime,
        selected: true,
      },
      {
        name: 'culture',
        color: AppColors.red,
        selected: true,
      },
      {
        name: 'shows',
        color: AppColors.magenta,
        selected: true,
      },
      {
        name: 'workshops',
        color: AppColors.yellow,
        selected: true,
      },
    ];
  }

  ngOnInit() {
  }

  toggleCategory(event, category: ICategory) {
    category.selected = !category.selected;
  }

}
