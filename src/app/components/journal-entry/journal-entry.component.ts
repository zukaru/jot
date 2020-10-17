import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrls: ['./journal-entry.component.scss']
})
export class JournalEntryComponent implements OnInit {

  @Input() entryTitle: string;
  @Input() entryBody: string;
  @Input() entryDate: string;
  @Input() entryId: string;

  constructor(
    private dbService: DatabaseService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  persistEntryId() {
    this.dbService.setPersist('ENTRY_ID', this.entryId);
  }

  navToEntry() {
    this.persistEntryId();
    this.route.navigate(['/entry', this.entryId]);
  }

}
