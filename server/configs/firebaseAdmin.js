import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// For local development, we'll use a mock Firebase Admin
// In production, you'll need to set FIREBASE_SERVICE_ACCOUNT_JSON
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountJson) {
  console.warn("[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT_JSON not set. Using mock Firebase Admin for local development.");
}

let app;
try {
  if (!admin.apps.length) {
    if (serviceAccountJson) {
      // Production: Use real Firebase Admin
      const credentials = JSON.parse(Buffer.from(serviceAccountJson, 'base64').toString('utf8'));
      app = admin.initializeApp({
        credential: admin.credential.cert(credentials)
      });
      console.log("✅ Firebase Admin SDK initialized with service account");
    } else {
      // Local development: Initialize without credentials (will fail on auth calls)
      app = admin.initializeApp({
        projectId: "tasksift-klxc5" // Your Firebase project ID
      });
      console.log("⚠️ Firebase Admin SDK initialized without credentials (local dev mode)");
    }
  } else {
    app = admin.app();
  }
} catch (err) {
  console.error("[firebaseAdmin] Failed to init:", err?.message || err);
}

export default admin;


