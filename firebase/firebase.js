import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "xpensiva.firebaseapp.com",
    databaseURL: "https://xpensiva-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "xpensiva",
    storageBucket: "xpensiva.appspot.com",
    messagingSenderId: "283194596422",
    appId: "1:283194596422:web:9bda0c0b80762dee7f7e47",
    measurementId: "G-73YSPC9SME"
}

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)
const auth = getAuth(app)

export { database, auth }