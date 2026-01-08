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
  serverTimestamp,
  collectionGroup,
  getCountFromServer
} from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth };

export class FirebaseService {
  // Auth functions
  static async registerWithEmail(email: string, password: string, name: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create new user document with default free tier
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        tier: 'free',
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error creating user profile:", e);
    }
    
    return user;
  }

  static async loginWithEmail(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  static async loginWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user doc exists, if not create it
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        email: user.email,
        name: user.displayName,
        tier: 'free',
        createdAt: serverTimestamp(),
      });
    }
    
    return user;
  }

  static async loginWithGithub(): Promise<User> {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    
    // Check if user doc exists, if not create it
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        email: user.email,
        name: user.displayName,
        tier: 'free',
        createdAt: serverTimestamp(),
      });
    }
    
    return user;
  }

  static async logoutUser(): Promise<void> {
    await signOut(auth);
  }

  static onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Saves a new health event to Firestore
  static async saveHealthEvent(userId: string, event: Omit<HealthEvent, 'id' | 'timestamp'>) {
    try {
      const colRef = collection(db, "users", userId, "events");
      await addDoc(colRef, {
        ...event,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.error("Firebase Error:", e);
    }
  }

  // Retrieves health events for a specific user
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

  // Retrieves user profile data
  static async getUserProfile(userId: string): Promise<any> {
    try {
      const docRef = doc(db, "users", userId);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : null;
    } catch (e) {
      console.error("Error fetching user profile:", e);
      return null;
    }
  }

  // Gets user subscription tier
  static async getUserSubscription(userId: string): Promise<'free' | 'pro'> {
    try {
      const docRef = doc(db, "users", userId);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? (snapshot.data().tier || 'free') : 'free';
    } catch {
      return 'free';
    }
  }

  // Upgrades a user to pro tier
  static async upgradeUser(userId: string) {
    try {
      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { tier: 'pro' }, { merge: true });
    } catch (e) {
      console.error("Upgrade Error:", e);
    }
  }

  // Saves user privacy settings
  static async savePrivacySettings(userId: string, settings: PrivacySettings) {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { privacySettings: settings }, { merge: true });
  }

  // Retrieves user privacy settings
  static async getPrivacySettings(userId: string): Promise<PrivacySettings | null> {
    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data().privacySettings : null;
  }

  // Saves user feedback
  static async saveFeedback(userId: string | null, rating: number, comment: string) {
    try {
      const colRef = collection(db, "feedback");
      await addDoc(colRef, {
        userId: userId || 'anonymous',
        rating,
        comment,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.error("Firebase Error (Feedback):", e);
    }
  }

  // Saves a support ticket
  static async saveSupportTicket(data: { name: string, email: string, issue: string, message: string, userId?: string }) {
    try {
      const colRef = collection(db, "support_tickets");
      await addDoc(colRef, {
        ...data,
        status: 'open',
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.error("Firebase Error (Support):", e);
    }
  }

  // Admin: Get global statistics
  static async getGlobalStats() {
    try {
      // 1. Get total users
      const usersSnap = await getCountFromServer(collection(db, "users"));
      const totalUsers = usersSnap.data().count;

      // 2. Get total feedback
      const feedbackSnap = await getCountFromServer(collection(db, "feedback"));
      const totalFeedback = feedbackSnap.data().count;

      // 3. Get total support tickets
      const ticketsSnap = await getCountFromServer(collection(db, "support_tickets"));
      const totalTickets = ticketsSnap.data().count;

      // 4. Get total events (using collection group query)
      const eventsQuery = query(collectionGroup(db, "events")); 
      const eventsSnap = await getCountFromServer(eventsQuery);
      const totalEvents = eventsSnap.data().count;
      
      // Calculate active uplinks (users active in last 24h) - simplified estimation
      // Real implementation would check lastLogin field
      const activeUplinks = Math.floor(totalUsers * 0.4); 

      return {
        totalUsers,
        totalFeedback,
        totalTickets,
        totalEvents,
        activeUplinks
      };
    } catch (e) {
      console.error("Error fetching global stats:", e);
      return {
        totalUsers: 0,
        totalFeedback: 0,
        totalTickets: 0,
        totalEvents: 0,
        activeUplinks: 0
      };
    }
  }

  // Admin: Get recent global events for analytics
  static async getRecentGlobalEvents(limitCount: number = 100) {
    try {
      const q = query(
        collectionGroup(db, "events"), 
        orderBy("timestamp", "desc"), 
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toMillis() || Date.now(),
        // safely handle optional fields for analytics
        severity: doc.data().severity || 'LOW',
        type: doc.data().type || 'UNKNOWN'
      }));
    } catch(e) {
      console.error("Error fetching events:", e);
      return [];
    }
  }

  // Admin: Get recent feedback
  static async getRecentFeedback(limitCount: number = 20) {
     try {
      const q = query(
        collection(db, "feedback"), 
        orderBy("timestamp", "desc"), 
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data().comment || "No content");
    } catch(e) {
      console.error("Error fetching feedback:", e);
      return [];
    }
  }

  static get currentUser() {
    return auth.currentUser;
  }

  // Delete user account
  static async deleteUserAccount(userId: string): Promise<void> {
    try {
      // 1. Delete user document in Firestore (events subcollection will technically remain unless recursive delete is used, but main link is gone)
      const docRef = doc(db, "users", userId);
      // Ideally we would recursively delete subcollections here
      await setDoc(docRef, { deleted: true, deletedAt: serverTimestamp() });
      
      // 2. Delete Auth User if authenticated
      const user = auth.currentUser;
      if (user) {
        await user.delete();
      }
    } catch (e) {
      console.error("Delete Account Error:", e);
      throw e;
    }
  }
}
