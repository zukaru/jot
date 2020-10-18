import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class EntryDataService {
  journalEntryList = [];
  activeEntryId: string;
  temporaryEntry: any;

  constructor(
    public afs: AngularFirestore,
    public db: DatabaseService
  ) { }


  fetchEntries() {
    return this.afs.collection('entries', ref => ref.where('userId', '==', this.db.userId))
      .get()
  }


  getEntry(entryId: string) {
    return this.journalEntryList.find((el) => el.id === entryId);
  }

  deleteEntry(entryId: string): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).delete()
  }


  updateEntry(entryId: string, data: unknown): Promise<void> {
    return this.afs.doc(`entries/${entryId}`).set(data)
  }
  

  
}