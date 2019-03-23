import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './shared/services/database.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public db: DatabaseService) {}

  public ngOnInit() {
    this.getData();
  }
  /**
   * Database service sandbox
   */
  private getData(): void {
    this.db
      .getTest()
      .pipe(catchError(err => of(`Error ${err}`)))
      .subscribe(data => console.log(data));
  }
}
