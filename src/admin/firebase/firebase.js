import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyA2QqTDxsBsPDUR4ttNsEaXCBLVFKEpqXE',
  authDomain: 'recruitment-54d86.firebaseapp.com',
  databaseURL: 'https://recruitment-54d86.firebaseio.com',
  projectId: 'recruitment-54d86',
  storageBucket: 'enclave-recruitment.appspot.com',
  messagingSenderId: '233295150051',
  appId: '1:233295150051:web:ffae1b306f27002e'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
