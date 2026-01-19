import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc,
  onSnapshot
} from "firebase/firestore";

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

export interface HostConnection {
  hostId: string;
  status: 'connected' | 'rejected';
}

class FirebaseService {
  async verifySyncCode(sessionId: string): Promise<HostConnection> {
    try {
        const docRef = doc(db, "remote_sessions", sessionId);
        const snapshot = await getDoc(docRef);
        
        if (snapshot.exists()) {
            return {
                hostId: sessionId, 
                status: 'connected'
            };
        }
        throw new Error("Invalid Session ID");
    } catch (e: any) {
        throw new Error(e.message || "Connection Failed");
    }
  }

  async streamDataToHost(sessionId: string, frameData: string, metadata: any): Promise<void> {
    try {
        const sessionRef = doc(db, "remote_sessions", sessionId);
        await updateDoc(sessionRef, {
            data: {
                image: frameData,
                timestamp: Date.now(),
                ...metadata
            },
            activeSource: 'mobile' // Implicitly set source to mobile when streaming
        });
    } catch (e) {
        console.error("Stream Error", e);
    }
  }

  async setActiveSource(sessionId: string, source: 'web' | 'mobile' | null): Promise<void> {
       const sessionRef = doc(db, "remote_sessions", sessionId);
       await updateDoc(sessionRef, { activeSource: source });
  }

  onSessionSourceChange(sessionId: string, callback: (source: 'web' | 'mobile' | null) => void): () => void {
      return onSnapshot(doc(db, "remote_sessions", sessionId), (snapshot) => {
          if (snapshot.exists()) {
              callback(snapshot.data().activeSource || null);
          }
      });
  }

  async terminateSession(sessionId: string): Promise<void> {
    try {
        const sessionRef = doc(db, "remote_sessions", sessionId);
        await updateDoc(sessionRef, {
            isActive: false,
            data: null
        });
    } catch(e) {
        console.error("Termination Error", e);
    }
  }
}

export const firebaseService = new FirebaseService();
