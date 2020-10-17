import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { EntryDataService } from 'src/app/services/entry-data.service';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.scss']
})
export class JournalEntriesComponent implements OnInit, OnDestroy {
  fetchEntrySub: Subscription
  

  constructor(
    public eds: EntryDataService,
    public db: DatabaseService,
    public afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    if(this.db.userId) {
      this.fetchEntrySub = this.eds.fetchEntries()
      .subscribe(
        (res) => {
          this.eds.journalEntryList = res.docs.map(
            (d) => {
              return {journalEntry: d.data(), id: d.id}
            });
        }
      );
    }

  }

  ngOnDestroy(): void {
    this.fetchEntrySub.unsubscribe();

  }

}
