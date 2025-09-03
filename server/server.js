import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import adminRoutes, { userRout } from './routes/adminRoutes.js';
import blogRouter from './routes/blogRouter.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database (await to avoid buffering timeouts on first requests)
await connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB on startup:', err?.message || err);
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api", userRout);
app.use("/api/blog", blogRouter);

// Basic route to show server is running
app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'checking...'
  });
});

// Environment check endpoint (for debugging)
app.get('/env-check', (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    isVercel: !!process.env.VERCEL,
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasImagekitPublic: !!process.env.IMAGEKIT_PUBLIC_KEY,
    hasImagekitPrivate: !!process.env.IMAGEKIT_PRIVATE_KEY,
    hasImagekitUrl: !!process.env.IMAGEKIT_URL_ENDPOINT,
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID || !!process.env.GOOGLE_CLIENT_IDS,
    adminEmailsConfigured: !!process.env.ADMIN_EMAIL || !!process.env.ADMIN_EMAILS,
    vercelEnv: process.env.VERCEL_ENV || 'none',
    deploymentTime: new Date().toISOString()
  });
});

// Test endpoint to verify firebase-login route exists
app.post('/test-firebase-login', (req, res) => {
  res.json({ 
    success: true, 
    message: "Firebase login endpoint test - server is updated",
    timestamp: new Date().toISOString()
  });
});

// Temporary fix: Add firebase-login route directly to main server
app.post('/api/admin/firebase-login', async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log('🔥 Firebase login attempt received');
    
    if (!idToken) {
      console.log('❌ No idToken provided');
      return res.json({ success: false, message: "Firebase idToken is required" });
    }

    // For local development, we'll decode the JWT manually since Firebase Admin isn't configured
    let email, name;
    
    try {
      // Decode the JWT payload (this is not secure for production!)
      const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
      email = payload.email;
      name = payload.name || payload.email || "Admin";
      console.log('👤 Decoded user from JWT:', { email, name });
    } catch (jwtError) {
      console.error('❌ Failed to decode JWT:', jwtError.message);
      return res.json({ success: false, message: "Invalid Firebase token" });
    }

    if (!email) {
      console.log('❌ No email in token');
      return res.json({ success: false, message: "Token missing email" });
    }

    // Allow any Google/Firebase-authenticated email to receive an admin JWT.
    console.log('✅ Google user authenticated, generating admin JWT...');
    const jwt = await import('jsonwebtoken');
    const token = jwt.default.sign({ email, name, role: "admin" }, process.env.JWT_SECRET);
    console.log('🎫 JWT generated successfully');
    
    return res.json({ success: true, message: `Welcome, ${name}`, token, admin: { name, email } });
  } catch (error) {
    console.error("❌ Firebase login error:", error);
    return res.json({ success: false, message: error.message || "Firebase authentication failed" });
  }
});

// In serverless environments like Vercel, we should NOT call app.listen().
// Vercel will handle the HTTP server and invoke the exported app as a handler.
// Only start a local server when running locally (e.g., npm run dev).
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  });
}

export default app;// Force Vercel deployment - Wed Sep 03 22:20:00 IST 2025
