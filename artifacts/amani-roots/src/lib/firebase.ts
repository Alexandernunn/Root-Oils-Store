import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

// ─────────────────────────────────────────────────────────────────────────────
// REPLACE these placeholder values with your own Firebase project credentials.
// Find them at: https://console.firebase.google.com → Project Settings → General
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyDX9CwblPPuwdQzz3icBYxxyFg0H3-4jiw",
  authDomain:        "hi12-f2ba1.firebaseapp.com",
  projectId:         "hi12-f2ba1",
  storageBucket:     "hi12-f2ba1.firebasestorage.app",
  messagingSenderId: "105792097856",
  appId:             "1:105792097856:web:9d34a35d3ad824811859a5",
  measurementId:     "G-T9HVGXXJRQ",
}

// ─────────────────────────────────────────────────────────────────────────────
// Firestore Security Rules — paste these into Firebase Console > Firestore > Rules
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }
// ─────────────────────────────────────────────────────────────────────────────

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
