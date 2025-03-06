// Code to connect to Firebase
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getAnalytics } from "firebase/analytics";
    import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyAjyJCPN7IASznl_zoDzAPXQGP4QP1z40A",
    authDomain: "rounding-third-llc.firebaseapp.com",
    projectId: "rounding-third-llc",
    storageBucket: "rounding-third-llc.firebasestorage.app",
    messagingSenderId: "76420295271",
    appId: "1:76420295271:web:cededa55614299e47002c2",
    measurementId: "G-MJ8SD0FZ4L"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);
    const auth = getAuth(app);

    export { db, auth };
