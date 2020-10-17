import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(
    private router: Router,
    private db: DatabaseService,
    ) { }

  logInSuccess(event: FirebaseUISignInSuccessWithAuthResult) {
    this.router.navigateByUrl('/');
    alert('You successfully logged in!')
    this.db.userId = event.authResult.user.uid;
    this.db.setPersist('USER_ID', this.db.userId);
  }

}
