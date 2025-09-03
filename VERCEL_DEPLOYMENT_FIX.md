# Vercel Deployment Fix for Google Login

## Issues and Solutions

### 1. Firebase Environment Variables
Add these environment variables in your Vercel dashboard:

**Client Environment Variables:**
```
VITE_FIREBASE_API_KEY=AIzaSyBL033SGTraDYXdl1Iew0INJrkglmNspiM
VITE_FIREBASE_AUTH_DOMAIN=tasksift-klxc5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tasksift-klxc5
VITE_FIREBASE_STORAGE_BUCKET=tasksift-klxc5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=972344202966
VITE_FIREBASE_APP_ID=1:972344202966:web:78aaad542d1bc14bac5b77
```

**Server Environment Variables:**
```
FIREBASE_SERVICE_ACCOUNT_JSON=<base64-encoded-service-account-json>
```

### 2. Firebase Console Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `tasksift-klxc5`
3. Go to Authentication > Settings > Authorized domains
4. Add your Vercel domain: `your-app-name.vercel.app`
5. Add `localhost` for local development

### 3. Firebase Service Account Setup

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Convert to base64:
   ```bash
   base64 -i service-account.json
   ```
5. Add the base64 string as `FIREBASE_SERVICE_ACCOUNT_JSON` in Vercel

### 4. Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to APIs & Services > Credentials
4. Edit your OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `https://your-app-name.vercel.app`
   - `http://localhost:3000` (for local dev)

### 5. Test the Fix

After making these changes:
1. Redeploy your Vercel app
2. Test Google login on the deployed site
3. Check browser console for any errors
4. Check Vercel function logs for server-side errors

## Common Issues

- **"auth/configuration-not-found"**: Check Firebase project ID and API key
- **"auth/unauthorized-domain"**: Add domain to Firebase authorized domains
- **"auth/popup-closed-by-user"**: User cancelled the popup (normal)
- **Server errors**: Check Firebase Admin SDK configuration

## Debug Steps

1. Check browser console for client-side errors
2. Check Vercel function logs for server-side errors
3. Verify environment variables are set correctly
4. Test with a fresh browser session (clear cache/cookies)
