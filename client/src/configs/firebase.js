import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';

// Firebase configuration - using your actual values
const firebaseConfig = {
  apiKey: "AIzaSyBL033SGTraDYXdl1Iew0INJrkglmNspiM",
  authDomain: "tasksift-klxc5.firebaseapp.com",
  projectId: "tasksift-klxc5",
  storageBucket: "tasksift-klxc5.firebasestorage.app",
  messagingSenderId: "972344202966",
  appId: "1:972344202966:web:78aaad542d1bc14bac5b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Configure Google provider for better UX
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

console.log('✅ Firebase initialized successfully');

export { auth, googleProvider, signInWithRedirect, getRedirectResult };
export default app;
