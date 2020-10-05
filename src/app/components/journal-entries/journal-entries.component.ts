import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { JournalEntryModel } from 'src/app/journal-entry-model';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.scss']
})
export class JournalEntriesComponent implements OnInit, OnDestroy {

  journalEntrySub: Subscription;



  journalEntryList = [];
  

  constructor(
    private db: DatabaseService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.journalEntrySub = this.afs.collection('entries', ref => ref.where('userId', '==', this.db.userId))
    .get()
    .subscribe(
      (res) => {
        this.journalEntryList = res.docs.map(d => d.data());
        console.log(this.journalEntryList)
      }
    )

  }

  ngOnDestroy(): void {

  }

}
