import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBKB04TgmgdnM1A3_IhDc7RMc0a-_6n31g',
  authDomain: 'apphemeroteca.firebaseapp.com',
  databaseURL: 'https://apphemeroteca.firebaseio.com',
  projectId: 'apphemeroteca',
  storageBucket: '',
  messagingSenderId: '400788218260'
}

const firestore = {
  apiKey: 'AIzaSyBKB04TgmgdnM1A3_IhDc7RMc0a-_6n31g',
  authDomain: 'apphemeroteca.firebaseapp.com',
  projectId: 'apphemeroteca'
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;