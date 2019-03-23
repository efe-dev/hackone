import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface ErrorResponse {
  error: string;
}
export interface SuccessResponse {
  message: string | null;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(public db: AngularFireDatabase) {}

  public getTest(): Observable<any> {
    return new Observable(observer => {
      try {
        this.db.database.ref('test').on('value', snapshot => {
          observer.next(snapshot.val());
        });
      } catch (err) {
        observer.error(err);
      }
    });
  }
}
