import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
