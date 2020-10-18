import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EntryDataService } from 'src/app/services/entry-data.service';
import { Router } from '@angular/router';
import { JournalEntryModel } from 'src/app/journal-entry-model';

@Component({
  selector: 'app-journal-page',
  templateUrl: './journal-page.component.html',
  styleUrls: ['./journal-page.component.scss']
})
export class JournalPageComponent implements OnInit {
  submissionSuccess = false;
  deleteEntry = false;
  entryId: string;
  entry: JournalEntryModel
  title: string;
  body: string;


  constructor(
    public dbService: DatabaseService,
    private afs: AngularFirestore,
    public route: Router,
    public eds: EntryDataService
    ) { }

  ngOnInit(): void {
    if (this.dbService.getPersist('TEMP_ENTRY')) {
      let journalEntry = this.dbService.getPersist('TEMP_ENTRY');
      this.title = journalEntry.title;
      this.body = journalEntry.body;
      this.dbService.clearPersist('TEMP_ENTRY')
    }
    if (this.route.isActive('/entry', false)) {
      if( !(this.eds.journalEntryList.length > 0) ) {
        this.eds.fetchEntries()
        .subscribe(
          (res) => {
            this.eds.journalEntryList = res.docs.map(
              (d) => {
                return {journalEntry: d.data(), id: d.id}
              });
              this.entry = this.eds.getEntry(this.dbService.getPersist('ENTRY_ID')).journalEntry;
              this.title = this.entry.title;
              this.body = this.entry.body;
              console.log(this.title, this.body)
          }
        );
      } else {
        this.entry = this.eds.getEntry(this.dbService.getPersist('ENTRY_ID')).journalEntry;
        this.title = this.entry.title;
        this.body = this.entry.body;
        console.log(this.title, this.body)
      }
      
    }

  }

  onSubmissionSuccess() {
    this.submissionSuccess = true;
    setTimeout( () => {
      this.submissionSuccess = false;
    }, 3000);
  }

  onFormSubmit(f: NgForm, isNew: boolean) {

    // Bundle form data into journal entry object
    const journalEntry = {
      userId: this.dbService.userId,
      title: f.value.journal_title,
      body: f.value.journal_body,
      date: new Date().toDateString(),
      entryId: '',
      }



    if (this.route.isActive('/entry', false) && !isNew) {
      console.log('Post fake updated')
    }

    
    
  }

  submitJE(f: NgForm) {
    const journalEntry = {
      userId: this.dbService.userId,
      title: f.value.journal_title,
      body: f.value.journal_body,
      date: new Date().toDateString(),
      entryId: '',
      }
      if (this.dbService.userId) {
          this.afs.collection('entries')
        .add(journalEntry)
        .then((docRef) => {
          let addJournalEntryId = {...journalEntry};
          addJournalEntryId.entryId = docRef.id;
          f.reset();
        })
        .then(() => this.onSubmissionSuccess())
        .catch(() => alert('Something went wrong, try again.'))
    } else {
      let redirect = confirm("You're not signed in. You must be signed in to submit a journal entry. Do you want to be redirected to sign in or sign up?");
      if (redirect) {
        this.dbService.setPersist('TEMP_ENTRY', {...journalEntry});
        this.route.navigateByUrl('/auth')
      }
    }
  }

  deleteJE(entryId: string) {
    let canDel = prompt("Type 'DELETE' in all uppercase to delete this entry.");
    if (canDel === 'DELETE') {
      this.eds.deleteEntry(entryId)
      .then(() => {
        alert('Journal entry deleted')
        this.route.navigate(['/entries']);
      })
      .catch(() => alert('Journal entry not deleted, try again.'))
    }
  }
   
  

  updateJE(f: NgForm) {
    const journalEntry = {
      userId: this.dbService.userId,
      title: f.value.journal_title,
      body: f.value.journal_body,
      date: new Date().toDateString(),
      entryId: '',
      }
    this.eds.updateEntry(this.dbService.getPersist('ENTRY_ID'), journalEntry)
    .then(() => alert('Journal entry updated.'))
    .catch(() => alert('Journal entry not updated, try again.'))
  }



  

}
