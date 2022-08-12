// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyDtAG7iFA5xcmYUfJ-wSHKAVNJCg1HGexQ",

    authDomain: "project3-trivia.firebaseapp.com",

    projectId: "project3-trivia",

    storageBucket: "project3-trivia.appspot.com",

    messagingSenderId: "388671284824",

    appId: "1:388671284824:web:fa24123fde45de7e59cc2d"

};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;