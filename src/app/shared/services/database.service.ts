import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInsance: database.Database;
  constructor(public angularFireDatabase: AngularFireDatabase) {
    this.dbInsance = angularFireDatabase.database;
  }

  public instance(): database.Database {
    return this.dbInsance;
  }
}
