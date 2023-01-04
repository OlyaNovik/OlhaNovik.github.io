// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQmI8lqZV39X-i5R4yRHg1jXyPNcUWiJI",
  authDomain: "projectcv-eb5a1.firebaseapp.com",
  projectId: "projectcv-eb5a1",
  storageBucket: "projectcv-eb5a1.appspot.com",
  messagingSenderId: "194621826655",
  appId: "1:194621826655:web:109a9b34a8f9124d691dea"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)
 export const auth = getAuth(app)
 export default getFirestore()

