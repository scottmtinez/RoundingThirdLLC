// Code to connect to Firebase
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getAnalytics } from "firebase/analytics";
    import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
    const firebaseConfig = {
        HIDDEN
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);
    const auth = getAuth(app);

    export { db, auth };
