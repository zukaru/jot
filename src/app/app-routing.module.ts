import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { JournalPageComponent } from './components/journal-page/journal-page.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
