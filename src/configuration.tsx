// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQbTKOxWuHbrbHwB1FaYV-grW-2_mhq0o",
  authDomain: "todoreactapp-acd12.firebaseapp.com",
  databaseURL: "https://todoreactapp-acd12-default-rtdb.firebaseio.com",
  projectId: "todoreactapp-acd12",
  storageBucket: "todoreactapp-acd12.firebasestorage.app",
  messagingSenderId: "180429183971",
  appId: "1:180429183971:web:701a3309fc7f5244ed9ed6",
  measurementId: "G-JKWP32MS4T"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default cong;