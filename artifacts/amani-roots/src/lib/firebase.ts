import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// ─────────────────────────────────────────────────────────────────────────────
// REPLACE these placeholder values with your own Firebase project credentials.
// Find them at: https://console.firebase.google.com → Project Settings → General
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID",
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

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
