# Vedified Client (React + Vite)

## Google Sign-In

Add the following environment variable in Vercel (Project → Settings → Environment Variables) or a local `.env` file at the repo root for local development:

```
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

The login page (`/admin`) renders the Google button via the Google Identity Services script included in `index.html`.
