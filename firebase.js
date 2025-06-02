// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCM_mQULdndLnXTXmjvWMM1u1jY3619fXc",
  authDomain: "my-miniapp-e609e.firebaseapp.com",
  projectId: "my-miniapp-e609e",
  storageBucket: "my-miniapp-e609e.firebasestorage.app",
  messagingSenderId: "791995427739",
  appId: "1:791995427739:web:cbe22b29ddfea2b4a70f3e",
  measurementId: "G-R1K9ZJD59Y"
};

// firebase.initializeApp(firebaseConfig);
// const database = firebase.database();  // Для Realtime Database

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };  // Экспортируем для использования в других файлах