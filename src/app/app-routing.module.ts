import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { JournalPageComponent } from './components/journal-page/journal-page.component';
import { JournalEntriesComponent } from './components/journal-entries/journal-entries.component';



const routes: Routes = [
  {path: '', component: JournalPageComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'entries', component: JournalEntriesComponent},
  {path: 'entry/:id', component: JournalPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
