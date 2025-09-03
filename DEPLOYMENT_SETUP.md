# 🚀 Vedified Blog Deployment Setup Guide

## 🔧 Fixed Issues

### 1. **Serverless File Upload Issue** ✅
- **Problem**: Multer was using `diskStorage()` which doesn't work in Vercel serverless environment
- **Solution**: Changed to `memoryStorage()` for serverless compatibility
- **Changed Files**: `routes/blogRouter.js`, `controlers/blogControler.js`

### 2. **Vercel Configuration** ✅
- **Added**: Increased Lambda size limit to 50MB for image uploads
- **Added**: Extended function timeout to 30 seconds
- **File**: `server/vercel.json`

### 3. **Debug Endpoints** ✅
- **Added**: `/env-check` endpoint to verify environment variables
- **Added**: Enhanced error logging for debugging

---

## 🔑 Environment Variables Setup

### **In Vercel Dashboard** (Critical!)

Go to your Vercel project settings and add these environment variables:

```bash
# Database
MONGODB_URI=your_mongodb_connection_string
DB_NAME=vedified-blogs

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key

# Admin Accounts (email allowlist)
# Option A: Single admin
# ADMIN_EMAIL=admin@yourdomain.com
# ADMIN_NAME=Your Admin Name
# Option B: Multiple admins (comma-separated)
# ADMIN_EMAILS=admin@yourdomain.com,editor@yourdomain.com
# ADMIN_NAMES=Admin,Editor

# Google Sign-In
# Use one of the following options:
# Single client id
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
# Or multiple (comma-separated) if you have different origins
# GOOGLE_CLIENT_IDS=id1.apps.googleusercontent.com,id2.apps.googleusercontent.com

# ImageKit (for image uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Gemini AI (for blog content generation)
GEMINI_API_KEY=your_gemini_api_key

# Node Environment
NODE_ENV=production
```

---

## 📋 Step-by-Step Deployment

### 1. **Push Your Code**
```bash
git add .
git commit -m "Fix: Serverless deployment compatibility"
git push origin main
```

### 2. **Verify Environment Variables**
- Visit: `https://your-vercel-url.vercel.app/env-check`
- Should return `true` for all required variables including `hasGoogleClientId` and `adminEmailsConfigured`

### 3. **Test Endpoints**
- Health check: `https://your-vercel-url.vercel.app/health`
- API test: `https://your-vercel-url.vercel.app/api/blog/`

### 4. **Test Blog Creation**
Try creating a blog through your admin panel.

---

## 🐛 Debugging Steps

### If blog creation still fails:

1. **Check Environment Variables**:
   ```
   GET https://your-vercel-url.vercel.app/env-check
   ```

2. **Check Server Logs** in Vercel Dashboard:
   - Go to Vercel Dashboard → Your Project → Functions tab
   - Check recent invocations for error logs

3. **Test ImageKit Connection**:
   - Verify your ImageKit credentials are correct
   - Ensure your ImageKit URL endpoint ends with `/` if required

4. **MongoDB Connection**:
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Verify connection string includes username/password

---

## ⚠️ Common Issues & Solutions

### **"Cannot read property 'path' of undefined"**
- **Cause**: Using disk storage in serverless
- **Fixed**: Now using memory storage ✅

### **"ImageKit upload failed"**
- **Check**: Environment variables set correctly
- **Check**: ImageKit quotas and permissions

### **"Database connection error"**
- **Check**: MongoDB Atlas IP whitelist
- **Check**: Connection string format

### **"JWT verification failed"**
- **Check**: JWT_SECRET is set in Vercel
- **Check**: Client sends proper Authorization header

---

## 🚀 After Deployment

1. Test Google sign-in button on `/admin` login page (client)
2. Ensure allowed admin emails can sign in; non-allowed are rejected
3. Confirm `Authorization: Bearer <token>` is attached in admin API calls
4. Test blog creation with an actual image
5. Verify images appear correctly on your blog
6. Test AI content generation
7. Test comment system

Your blog should now work perfectly in production! 🎉
