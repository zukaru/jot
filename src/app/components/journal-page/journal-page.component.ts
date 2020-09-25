import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-journal-page',
  templateUrl: './journal-page.component.html',
  styleUrls: ['./journal-page.component.scss']
})
export class JournalPageComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private dbService: DatabaseService
    ) { }

  ngOnInit(): void {
  }

  onFormSubmit(f: NgForm) {
    if (this.dbService.userId) {
      alert('Still logged in, entry submitted.')
    } else {
      alert('Not logged in, entry not submitted.');
    }

    
  }

}
