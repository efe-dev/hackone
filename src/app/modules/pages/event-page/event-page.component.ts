import { Component, OnInit } from '@angular/core';
import {AppColors, AppColorsInvert} from '../../../models/colors.model';
import {EventService} from '../../../shared/services/event.service';
import {IEvent} from '../../../models';

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
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfSelectedValue = ['a10', 'c12'];

  events: any;

  constructor(
    private eventService: EventService,
  ) {
    this.categories = [
      {
        name: 'culture',
        color: AppColors.cyan,
        selected: true,
      },
      {
        name: 'sports',
        color: AppColors.lime,
        selected: true,
      },
      {
        name: 'music',
        color: AppColors.red,
        selected: true,
      },
      {
        name: 'workshop',
        color: AppColors.purple,
        selected: true,
      },
      {
        name: 'city',
        color: AppColors.gold,
        selected: true,
      },
    ];

    const children: Array<{ label: string; value: string }> = [];
    for (const category of this.categories) {
      children.push({ label: category.name, value: category.name });
    }
    this.listOfOption = children;

    this.events = [];
    this.eventService.getAllEvents()
      .then(data => {
        const response = data.data;

        for (const tmp of response) {
          const key = Object.keys(tmp)[0];
          const event = tmp[key];
          // tslint:disable-next-line
          event['id'] = key;
          this.events.push(event);
        }

      });

  }

  ngOnInit() {
  }

  toggleCategory(event, category: ICategory) {
    category.selected = !category.selected;
  }

  showOnMap(id: string) {
  //   a
  }

  trimText(text: string, limit: number) {
    return (text.length <= limit)
            ? text
            : text.slice(0, limit) + '...';
  }

  getColorName(hex: string) {
    console.warn(hex, AppColorsInvert[hex]);
    return AppColorsInvert[hex];
  }
}
