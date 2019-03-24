import { Component, OnInit } from '@angular/core';
import {AppColors} from '../../../models/colors.model';
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

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
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

}
