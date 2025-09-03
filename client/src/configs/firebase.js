import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase configuration - using environment variables for production
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBL033SGTraDYXdl1Iew0INJrkglmNspiM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tasksift-klxc5.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tasksift-klxc5",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tasksift-klxc5.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "972344202966",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:972344202966:web:78aaad542d1bc14bac5b77"
};

// Initialize Firebase
let app, auth, googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Configure Google provider for better UX
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  console.log('✅ Firebase initialized successfully');
  console.log('Firebase config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: !!firebaseConfig.apiKey
  });
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Firebase config used:', firebaseConfig);
}

export { auth, googleProvider, signInWithPopup };
export default app;
