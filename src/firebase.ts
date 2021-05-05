import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
    apiKey: "AIzaSyAXEB_PtArRHr2EMv6fJAvql5Gl-QxdP0Y",
    authDomain: "asdougl-recipe-storage.firebaseapp.com",
    projectId: "asdougl-recipe-storage",
    storageBucket: "asdougl-recipe-storage.appspot.com",
    messagingSenderId: "926370056726",
    appId: "1:926370056726:web:0d8c2cc8a7efd6713e8337",
    measurementId: "G-45CK9PG3SQ"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()