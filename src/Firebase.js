import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {};

const config = {
    apiKey: "AIzaSyDTztKAptjQ6yKkh9TaFlk5-5JDOavrQo4",
    authDomain: "burgerqueenscl7.firebaseapp.com",
    databaseURL: "https://burgerqueenscl7.firebaseio.com",
    projectId: "burgerqueenscl7",
    storageBucket: "burgerqueenscl7.appspot.com",
    messagingSenderId: "276130762392"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;