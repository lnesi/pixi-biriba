import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDc1QsGX4ESidv8DPS9amrrsr242ybcH4U",
  authDomain: "biri-c6acd.firebaseapp.com",
  databaseURL: "https://biri-c6acd-default-rtdb.firebaseio.com",
  projectId: "biri-c6acd",
  storageBucket: "biri-c6acd.appspot.com",
};
firebase.initializeApp(config);

export default firebase;
