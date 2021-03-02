import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAJatzOjqgLFgQWmlnmZ_h2tDudph9Nnuk',
  authDomain: 'event-eye-99575.firebaseapp.com',
  databaseURL: 'https://event-eye-99575.firebaseio.com',
  projectId: 'event-eye-99575',
  storageBucket: 'event-eye-99575.appspot.com',
  messagingSenderId: '253782740342',
  appId: '1:253782740342:web:71961d6985d47dd7167e57',
  measurementId: 'G-1GLRDWC09C',
})

export const firestore = app.firestore()
export const auth = app.auth()
export const storage = app.storage()
export default app
