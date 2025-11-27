import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import Constants from 'expo-constants';

let app, auth, db;

export function initFirebase() {
  if (!app) {
    app = initializeApp({
      apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
      authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
      projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
      storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
      appId: Constants.manifest.extra.FIREBASE_APP_ID,
    });
    auth = getAuth(app);
    db = getFirestore(app);

    signInAnonymously(auth).catch(console.error);
  }
  return { app, auth, db };
}

export async function submitReport(report) {
  if (!db) initFirebase();
  await addDoc(collection(db, 'reports'), report);
}

export function subscribeAlerts(callback) {
  if (!db) initFirebase();
  const q = query(collection(db, 'alerts'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
}
