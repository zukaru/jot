import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private db: DatabaseService
    ) { }

  ngOnInit(): void {
    // this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener);
    
  
  }

  logInSuccess(event: FirebaseUISignInSuccessWithAuthResult) {
    this.router.navigateByUrl('/');
    alert(`Login Success ${event.authResult.user.uid}`)
    this.db.userId = event.authResult.user.uid;

  }



  firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      console.log('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }

}
