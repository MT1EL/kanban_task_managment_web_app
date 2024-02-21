// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb8bH_j5DXxTwE1FbWAtV7b_Cg4UXQr5g",
  authDomain: "kanban-task-management-1199d.firebaseapp.com",
  projectId: "kanban-task-management-1199d",
  storageBucket: "kanban-task-management-1199d.appspot.com",
  messagingSenderId: "94200250212",
  appId: "1:94200250212:web:b92f9761dc7d4eb4c8c471",
  measurementId: "G-3HVHRWZ9X7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
