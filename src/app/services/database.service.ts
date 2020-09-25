import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

type JournalEntry = {title: string, body: string};


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  userId: string;


  constructor(public af: AngularFirestore) { }

  getCol() {
    return this.af.collection('entry').snapshotChanges()
    .pipe(

    )
  }

  
}
