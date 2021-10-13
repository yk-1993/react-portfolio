// Import the functions you need from the SDKs you need
import { firebase } from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWRbAQl3Vaxg-fS7sxVq9YogepizMw4WU",
  authDomain: "react-portfolio-9eff7.firebaseapp.com",
  projectId: "react-portfolio-9eff7",
  storageBucket: "react-portfolio-9eff7.appspot.com",
  messagingSenderId: "711718678801",
  appId: "1:711718678801:web:ece27e28d6145cf7359cb0",
  measurementId: "G-DNY6Q4ZGBD",
};

// Initialize Firebase
export const firebaseapp = firebase.initializeApp(firebaseConfig);

// Firestoreのインスタンス作成
export const fireBaseStore = firebaseapp.fireStore();

export default firebase;
