
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  setDoc, 
  doc, 
  getDoc,
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { HealthEvent, PrivacySettings } from "../types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqsrPg7DutKyhnvGwdchuEfg7LECz684Q",
  authDomain: "devwell-b6a4b.firebaseapp.com",
  databaseURL: "https://devwell-b6a4b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "devwell-b6a4b",
  storageBucket: "devwell-b6a4b.firebasestorage.app",
  messagingSenderId: "76204363860",
  appId: "1:76204363860:web:aff448db2428445cd89dc1",
  measurementId: "G-NGCJ2KNP4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Export auth instance
export { auth };

// Auth functions
export const registerWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const loginWithGithub = async (): Promise<User> => {
  const result = await signInWithPopup(auth, githubProvider);
  return result.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export class FirebaseService {
  /**
   * Syncs a health event to the user's Firestore sub-collection.
   */
  static async saveHealthEvent(userId: string, event: Omit<HealthEvent, 'id' | 'timestamp'>) {
    try {
      const colRef = collection(db, "users", userId, "events");
      await addDoc(colRef, {
        ...event,
        timestamp: serverTimestamp(),
      });
      
      // Update platform aggregates (Simulated for Admin view)
      const globalRef = doc(db, "platform_metrics", "aggregates");
      // In a real app, this would be a Cloud Function or a transaction
      console.log("Persistence Layer: Event saved to Firebase Firestore.");
    } catch (e) {
      console.error("Firebase Error:", e);
    }
  }

  /**
   * Fetches latest health events for a user.
   */
  static async getHealthEvents(userId: string, count: number = 20): Promise<HealthEvent[]> {
    try {
      const colRef = collection(db, "users", userId, "events");
      const q = query(colRef, orderBy("timestamp", "desc"), limit(count));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type,
          severity: data.severity,
          description: data.description,
          timestamp: data.timestamp?.toMillis() || Date.now(),
        } as HealthEvent;
      });
    } catch (e) {
      console.error("Firebase Error:", e);
      return [];
    }
  }

  /**
   * Manages user privacy settings in Firestore.
   */
  static async savePrivacySettings(userId: string, settings: PrivacySettings) {
    try {
      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { privacySettings: settings }, { merge: true });
    } catch (e) {
      console.error("Firebase Error:", e);
    }
  }

  static async getPrivacySettings(userId: string): Promise<PrivacySettings | null> {
    try {
      const docRef = doc(db, "users", userId);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data().privacySettings : null;
    } catch (e) {
      console.error("Firebase Error:", e);
      return null;
    }
  }

  /**
   * Logic for Admin Dashboards (Aggregated view)
   */
  static async getPlatformSummary() {
    // Simulated fetch from Firestore global aggregates
    return {
      totalUsers: 1450,
      activeSessions: 320,
      avgSystemWellness: 88,
    };
  }
}
