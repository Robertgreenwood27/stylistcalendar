//firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export const getStylistAppointments = async (stylistId) => {
  const snapshot = await db
    .collection("appointments")
    .where("stylist", "==", stylistId)
    .get();

  const appointments = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return appointments;
};


export default db;