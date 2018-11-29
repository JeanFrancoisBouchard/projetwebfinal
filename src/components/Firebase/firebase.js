import app from 'firebase/app';
import 'firebase/auth';

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
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;