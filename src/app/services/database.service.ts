import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

type JournalEntry = {title: string, body: string};


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userId: string | false;


  constructor(public af: AngularFirestore) { }

  getCol() {
    return this.af.collection('entry').snapshotChanges()
    .pipe(

    )
  }


  setPersist(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getPersist(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  clearPersist(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error deleting from localStorage', e);
    }
  }

  
}
