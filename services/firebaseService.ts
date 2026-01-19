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
  getCountFromServer,
  updateDoc,
  onSnapshot
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
  signInWithPopup,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { HealthEvent, PrivacySettings, SupportTicket, UserProfile } from "../types";

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

      // Update firstCameraSync if it doesn't exist (First detection)
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && !userSnap.data().firstCameraSync) {
         await updateDoc(userRef, {
           firstCameraSync: serverTimestamp()
         });
      }
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
          ...data
        } as HealthEvent;
      });
    } catch (e) {
      console.error("Firebase Error:", e);
      return [];
    }
  }

  // Get alerts count for the last 24 hours
  static async get24HourAlerts(userId: string): Promise<number> {
    try {
      const colRef = collection(db, "users", userId, "events");
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const q = query(
        colRef, 
        where("timestamp", ">=", yesterday)
      );
      
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (e) {
      console.error("Error fetching 24h alerts:", e);
      return 0;
    }
  }

  // Get raw fatigue readings
  static async getFatigueReadings(userId: string, hours: number = 24): Promise<{timestamp: number, level: number}[]> {
    try {
      const colRef = collection(db, "users", userId, "events");
      const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
      
      const q = query(
        colRef,
        where("type", "==", "FATIGUE"),
        where("timestamp", ">=", startTime),
        orderBy("timestamp", "asc")
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs
        .map(doc => ({
          timestamp: doc.data().timestamp?.toMillis() || Date.now(),
          level: doc.data().fatigueLevel || 0
        }))
        .filter(item => item.level > 0);
    } catch (e) {
      console.error("Error fetching fatigue readings:", e);
      return []; // Return empty instead of fallback mock data
    }
  }

  // Get hourly fatigue averages
  static async getHourlyFatigueAverage(userId: string): Promise<{time: string, avgFatigue: number}[]> {
    try {
      const readings = await this.getFatigueReadings(userId, 24);
      
      // If no readings, return initialized 0 hour slots for consistency
      const hourlyData: {[key: string]: number[]} = {};
      const now = new Date();
      
      for(let i=0; i<24; i++) {
        const d = new Date(now.getTime() - (23-i) * 60 * 60 * 1000);
        const hourStr = d.getHours().toString().padStart(2, '0') + ":00";
        hourlyData[hourStr] = [];
      }
      
      if (readings.length === 0) {
          // Return empty structure with 0s
          return Object.entries(hourlyData).map(([time, values]) => ({
            time,
            avgFatigue: 0
          }));
      }
      
      readings.forEach(reading => {
        const d = new Date(reading.timestamp);
        const hourStr = d.getHours().toString().padStart(2, '0') + ":00";
        if (hourlyData[hourStr]) {
          hourlyData[hourStr].push(reading.level);
        }
      });
      
      return Object.entries(hourlyData).map(([time, values]) => ({
        time,
        avgFatigue: values.length ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10 : 0
      }));
    } catch (e) {
      console.error("Error calculating hourly fatigue:", e);
      return [];
    }
  }

  // Get 7-day activity based on session usage or alerts count
  static async get7DayActivity(userId: string): Promise<{name: string, activity: number}[]> {
    try {
      // Mock implementation for now
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date().getDay();
      
      return Array(7).fill(0).map((_, i) => {
        const dayIndex = (today - 6 + i + 7) % 7;
        return {
            name: days[dayIndex],
            activity: 0 
        };
      });
    } catch (e) {
       return [];
    }
  }
  
  // Get long-term progress data from firstCameraSync to Now
  static async getProgressData(userId: string): Promise<any[]> {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        
        let startTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // Default 7 days ago if no sync
        
        if (userSnap.exists() && userSnap.data().firstCameraSync) {
            startTime = userSnap.data().firstCameraSync.toMillis();
        } 

        const now = Date.now();
        // Ensure at least 1 day difference
        let daysDiff = Math.max(1, Math.floor((now - startTime) / (24 * 60 * 60 * 1000)));
        if (daysDiff > 365) daysDiff = 365; // Limit to 1 year for safety

        // Generate daily points
        return Array(daysDiff + 1).fill(0).map((_, i) => {
             const d = new Date(startTime + i * 24 * 60 * 60 * 1000);
             return {
                date: d.toLocaleDateString(undefined, {month: '2-digit', day: '2-digit'}),
                fullDate: d.toLocaleDateString(),
                timestamp: d.getTime(),
                productivityScore: 0, 
                avgFatigue: 0
             };
        });
    } catch(e) {
        console.error("Error getting progress data", e);
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

  // Toggles a user's subscription tier
  static async toggleTier(userId: string, targetTier: 'free' | 'pro'): Promise<void> {
    try {
      const userRef = doc(db, "users", userId);
      // Use setDoc with merge: true to ensure it works even if the document is missing or partial
      await setDoc(userRef, {
        tier: targetTier
      }, { merge: true });
    } catch (e) {
      console.error("Error toggling tier:", e);
      throw e;
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

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = auth.currentUser;
    if (!user || !user.email) throw new Error("No user authenticated");
    
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (e) {
      console.error("Error changing password:", e);
      throw e;
    }
  }

  static async getHourlyActivity() {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      activeUsers: 0,
      freeUsers: 0,
      proUsers: 0
    }));
  }

  static async getUsersByTier() {
    return [
      { date: 'Mon', free: 0, pro: 0, zinPro: 0 },
      { date: 'Tue', free: 0, pro: 0, zinPro: 0 },
      { date: 'Wed', free: 0, pro: 0, zinPro: 0 },
      { date: 'Thu', free: 0, pro: 0, zinPro: 0 },
      { date: 'Fri', free: 0, pro: 0, zinPro: 0 },
      { date: 'Sat', free: 0, pro: 0, zinPro: 0 },
      { date: 'Sun', free: 0, pro: 0, zinPro: 0 },
    ];
  }

  static async getAlertHistogram() {
     return [
       { range: '0-5', count: 0 },
       { range: '6-10', count: 0 },
       { range: '11-20', count: 0 },
       { range: '21-30', count: 0 },
       { range: '31-50', count: 0 },
       { range: '50+', count: 0 },
     ];
  }
  
  static async getFeedbackStats() {
    try {
      const q = query(collection(db, "feedback"), limit(100));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
         return { avgRating: "0.0", totalRaters: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
      }

      let total = 0;
      let count = 0;
      let distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      
      snapshot.forEach(doc => {
        const r = doc.data().rating;
        if (typeof r === 'number') {
           total += r;
           count++;
           if(r >= 1 && r <= 5) distribution[r as keyof typeof distribution]++;
        }
      });
      
      return {
        avgRating: count > 0 ? (total / count).toFixed(1) : "0.0",
        totalRaters: count,
        distribution
      };
    } catch {
      return { avgRating: "0.0", totalRaters: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    }
  }

  static async getTicketDistribution() {
    try {
        const q = query(collection(db, "support_tickets"));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
           return [
             { name: 'general', value: 0 },
             { name: 'support', value: 0 },
             { name: 'feedback', value: 0 },
             { name: 'billing', value: 0 },
           ];
        }

        const dist: any = { general: 0, support: 0, feedback: 0, billing: 0 };
        snapshot.forEach(doc => {
            const issue = doc.data().issue;
            if(dist[issue] !== undefined) dist[issue]++;
        });
        return Object.entries(dist).map(([name, value]) => ({ name, value }));
    } catch {
        return [
          { name: 'general', value: 0 },
          { name: 'support', value: 0 },
          { name: 'feedback', value: 0 },
          { name: 'billing', value: 0 },
        ];
    }
  }

  static async getAllFeedbackRaw() {
      try {
        const q = query(collection(db, "feedback"), orderBy("timestamp", "desc"), limit(50));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => d.data());
      } catch {
        return [];
      }
  }

  static async getAllTicketsRaw() {
      try {
        const q = query(collection(db, "support_tickets"), limit(50));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => d.data());
      } catch {
        return [];
      }
  }

  static async activateDemoMode(): Promise<void> {
    const auth = getAuth();
    let user = auth.currentUser;
    
    if (!user) {
        // Create a random demo user
        const randomId = Math.random().toString(36).substring(7);
        const email = `demo_${randomId}@devwell.app`;
        const password = `pass_${randomId}`; 
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;
            
            // Initialize user doc as PRO directly
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: "Demo Explorer",
                tier: 'pro', 
                createdAt: serverTimestamp(),
                isDemo: true
            });
        } catch (e) {
            console.error("Demo creation failed:", e);
            throw e;
        }
    } else {
        // Upgrade existing user for demo purposes
        await this.upgradeUser(user.uid);
    }
  }

  // --- Remote Sensing / Neural Link ---

  static async createSyncSession(userId: string): Promise<string> {
    const sessionRef = await addDoc(collection(db, "remote_sessions"), {
      hostId: userId,
      createdAt: serverTimestamp(),
      isActive: true,
      data: null,
      activeSource: null // 'web' | 'mobile' | null
    });
    return sessionRef.id;
  }

  static async setSessionActiveSource(sessionId: string, source: 'web' | 'mobile' | null) {
      const sessionRef = doc(db, "remote_sessions", sessionId);
      await updateDoc(sessionRef, {
          activeSource: source
      });
  }

  static onSessionStatusChange(sessionId: string, callback: (source: 'web' | 'mobile' | null) => void): () => void {
      const unsub = onSnapshot(doc(db, "remote_sessions", sessionId), (doc) => {
          if (doc.exists()) {
              const data = doc.data();
              callback(data.activeSource || null);
          }
      });
      return unsub;
  }

  static async updateSessionData(sessionId: string, frameData: string, audioData?: string) {
    const sessionRef = doc(db, "remote_sessions", sessionId);
    await updateDoc(sessionRef, {
       data: {
          image: frameData,
          audio: audioData || null,
          timestamp: Date.now()
       }
    });
  }

  static onSessionDataChange(sessionId: string, callback: (data: any) => void): () => void {
      const unsub = onSnapshot(doc(db, "remote_sessions", sessionId), (doc) => {
         if (doc.exists()) {
             callback(doc.data().data);
         }
      });
      return unsub;
  }
}

