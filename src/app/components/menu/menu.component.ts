import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userSub: Subscription;

  menuVisible = false;

  resizeWin = fromEvent(window, 'resize');

  constructor(
    private route: Router,
    private dbService: DatabaseService,
    public angularFireAuth: AngularFireAuth
  ) { }


  ngOnInit(): void {
    this.isSignedIn();
    this.setUserId();
    
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  goToAuth() {
    this.route.navigateByUrl('/auth');
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  signOut() {
    this.angularFireAuth.signOut()
    .then(() => {
      alert("You've successfully logged out. Come back soon!");
      this.route.navigateByUrl('');
      this.dbService.userId = false;
      this.dbService.clearPersist('USER_ID')
      this.isLoggedIn = false;
      this.menuVisible = false;
    })
    .catch(() => {
      alert('Something went wrong, try logging out again.')
    })
    ;
    
  }

  isSignedIn() {
    this.userSub = this.angularFireAuth.user.subscribe(
      (v: firebase.User) => {
        v?.uid ? this.isLoggedIn = true : this.isLoggedIn = false;
        }
    )
  }

  setUserId() {
    if(this.dbService.getPersist('USER_ID')) {
      this.dbService.userId = this.dbService.getPersist('USER_ID')
    }
  }
  

}
