import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-journal-page',
  templateUrl: './journal-page.component.html',
  styleUrls: ['./journal-page.component.scss']
})
export class JournalPageComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private dbService: DatabaseService,
    private afs: AngularFirestore
    ) { }

  ngOnInit(): void {
  }

  onFormSubmit(f: NgForm) {
    if (this.dbService.userId) {
      this.afs.collection('entries')
      .add({
        userId: this.dbService.userId,
        title: f.value.journal_title,
        body: f.value.journal_body,
        date: new Date().toDateString()
      })
      .then(() => alert('Still logged in, entry submitted.'))
      
    } else {
      alert('Not logged in, entry not submitted.');
    }

    
  }

  

}
