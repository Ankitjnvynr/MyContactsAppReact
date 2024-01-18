// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArhw7-PCV4qBAIPormPaL7vUmO6NiK-us",
  authDomain: "ankitcontactapp-5f005.firebaseapp.com",
  projectId: "ankitcontactapp-5f005",
  storageBucket: "ankitcontactapp-5f005.appspot.com",
  messagingSenderId: "44377817736",
  appId: "1:44377817736:web:a5bd09049948da0ec3953d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
export const db = getFirestore(app)
