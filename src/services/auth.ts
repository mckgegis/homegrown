import "firebase/auth";
import * as firebase from "firebase/app";

import { setGlobalState } from "react-global-state-hook";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAuziZmGkK1d69ujjUweFD3RRytFusBNQw",
  authDomain: "homegrown-9d3e7.firebaseapp.com",
  databaseURL: "https://homegrown-9d3e7.firebaseio.com",
  projectId: "homegrown-9d3e7",
  storageBucket: "homegrown-9d3e7.appspot.com",
  messagingSenderId: "743383846617",
  appId: "1:743383846617:web:5651d5fef3c21b789238c8",
  measurementId: "G-80NDQV6XE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
    setGlobalState("SIGNED_IN", true);
  } else {
    setGlobalState("SIGNED_IN", false);
  }
});

export const login = async (email, password) => {

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut()
  }
  catch (error) {
    console.log(error);
  }
}

