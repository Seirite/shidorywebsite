import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {NotifyService} from './NotifyService';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as auth from 'firebase'
import firebase = require('firebase');

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  isLoggedin?:boolean;
  ORG_ID:string;
  OPR_ID:string;
}

@Injectable()
export class AuthService {
    user: Observable<Observable<any>>;
//  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  ////// OAuth Methods /////
  googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((credential: any) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then((credential: any) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
          return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential: any) => {
          return credential.user;
//        this.notify.update('Welcome new user!', 'success');
//          return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
          this.handleError(error);
          return error;
      });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((credential: any) => {
          return credential.user;
//        this.notify.update('Welcome back!', 'success');
//          return this.updateUserData(credential.user);
      })
      .catch(error => {
//          this.handleError(error);
          return error;
      });
  }
  
  checkEmail(email: string)
  {
      return this.afAuth.auth.fetchSignInMethodsForEmail(email);
  }
  
  checkPhoneNumber(mobile: string, capcha: any)
  {
      return this.afAuth.auth.signInWithPhoneNumber(mobile, capcha);
  }
  
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then((data) => {
        console.log(data);
    })
  }


  // Sends email allowing user to reset password
  resetPassword(email: string) {
      const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
      console.log(user);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(        
      `USERS/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
        displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      ORG_ID:"1",
      OPR_ID:"1"
    };
      this.setSession(data);
//       userRef.set(data);
      return this.getSession();
  }
  
  public setSession(session:any)
  {
        localStorage.setItem('sessionUser', JSON.stringify(session));
  }
  
  public getSession():User
  {
      return JSON.parse(localStorage.getItem('sessionUser'));
  }
}
