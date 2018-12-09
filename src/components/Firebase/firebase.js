import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA6bdp6zvamUTPebw6aCrj-WCNsY6Bl_3I",
    authDomain: "projetweb-65e48.firebaseapp.com",
    databaseURL: "https://projetweb-65e48.firebaseio.com",
    projectId: "projetweb-65e48",
    storageBucket: "projetweb-65e48.appspot.com",
    messagingSenderId: "888526341491"
}


class Firebase {
    constructor() {
      app.initializeApp(config);
  
      this.auth = app.auth();
      this.db = app.database();

      this.googleProvider = new app.auth.GoogleAuthProvider();
      this.facebookProvider = new app.auth.FacebookAuthProvider();
    }
  
    // *** Auth API ***
  
    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
  
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
  
    doSignInWithGoogle = () =>
      this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
      this.auth.signInWithPopup(this.facebookProvider);
      
    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
  
    // *** User API ***
  
    user = uid => this.db.ref(`users/${uid}`);
  
    users = () => this.db.ref('users');
  }
  
  export default Firebase;