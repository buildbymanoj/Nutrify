# Google Sign In/Sign Up Setup Guide

## Overview
Your Nutrify app now supports Google authentication for both sign-in and sign-up. This guide will help you set up the necessary credentials and environment variables.

## Step 1: Get Google OAuth Credentials

### For Development (Local Testing):

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click on the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter a project name (e.g., "Nutrify")
   - Click "CREATE"

3. Enable the Google+ API:
   - In the left sidebar, go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click on it and press "ENABLE"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "CREATE CREDENTIALS" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" user type
     - Fill in the required fields (App name, User support email, etc.)
     - Add scopes: `email`, `profile`
     - Add test users (your email)
     - Save and continue

5. Create the OAuth 2.0 Client ID:
   - Application type: Select "Web application"
   - Name: "Nutrify Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (Vite default)
     - `http://localhost:3000` (if using different port)
     - Your production domain
   - Authorized redirect URIs:
     - `http://localhost:5173` (Vite default)
     - Your production URL
   - Click "CREATE"

6. Copy your credentials:
   - Copy your **Client ID** from the credentials page
   - Copy your **Client Secret** from the same page (store this securely!)

## Step 2: Configure Environment Variables

### Client-side (.env file in `client/` folder):

Create a `.env` file in the `client/` directory with:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
VITE_API_URL=http://localhost:8000
```

Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with the Client ID you copied from Google Cloud Console.

### Server-side (.env file in `server/` folder):

Add to your existing `.env` file:

```env
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
```

Use the same Client ID as above, and add the Client Secret from the Google Cloud Console.

## Step 3: Install Dependencies

### Client Dependencies (already installed):
```bash
npm install @react-oauth/google
```

### Server Dependencies (already installed):
```bash
npm install google-auth-library
```

## Step 4: Database Schema Update

The user model has been updated to include:
- `googleId`: Stores the unique Google user ID
- `isGoogleAuth`: Boolean flag indicating Google authentication
- `password`: Made optional for Google-only users
- `age`: Made optional for Google-only users (defaults to 25 if not provided during registration)

## Step 5: Test the Implementation

1. Start your server:
```bash
cd server
npm run dev
```

2. Start your client:
```bash
cd client
npm run dev
```

3. Visit `http://localhost:5173/login` or `/register`
4. Click the "Sign in with Google" or "Sign up with Google" button
5. Follow the Google OAuth flow
6. You should be authenticated and redirected to the `/track` page

## Features

- **Seamless Integration**: Google OAuth buttons added to both Login and Register pages
- **Smart Account Linking**: If a user registers with Google and later signs in with email (or vice versa), they're identified as the same user if the email matches
- **Auto User Creation**: New Google users are automatically created with their Google information
- **Secure Token Verification**: Server validates tokens with Google's servers before creating/logging in users
- **Session Management**: User session is stored in localStorage and managed via UserContext

## Troubleshooting

### "Invalid or expired token" Error
- Ensure `GOOGLE_CLIENT_ID` in `.env` files matches the one from Google Cloud Console
- Check that your domain is added to "Authorized JavaScript origins"
- Verify the token hasn't expired

### Button not appearing
- Check that `VITE_GOOGLE_CLIENT_ID` is set in client `.env`
- Verify the app is wrapped with `GoogleOAuthProvider` (already done in App.jsx)
- Check browser console for any errors

### Users not being created
- Ensure MongoDB connection is working
- Verify the server `.env` has `GOOGLE_CLIENT_ID` set
- Check server logs for any errors

### CORS Issues
- CORS is already enabled in your server (see `app.use(cors())`)
- If issues persist, ensure your frontend URL is allowed

## Production Deployment

Before deploying to production:

1. Update `Authorized JavaScript origins` in Google Cloud Console to include your production domain
2. Update `.env` files with production values:
   - `VITE_API_URL`: Your production API URL
   - `VITE_GOOGLE_CLIENT_ID`: Same Client ID (or create a new one for production)
3. Keep your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` secret on the server
4. Never commit `.env` files to git (already in `.gitignore`)

## Security Best Practices

⚠️ **Important Security Notes:**

1. **Client Secret Protection**: 
   - The `GOOGLE_CLIENT_SECRET` should NEVER be used in frontend code
   - Keep it only in your server `.env` file
   - Never commit it to git

2. **Environment Variables**:
   - Use strong, unique values for `JWT_SIGN`
   - Store all secrets in `.env` files (not in version control)
   - Use different credentials for development and production

3. **Token Validation**:
   - The server always validates Google tokens with Google's servers
   - This provides the highest level of security
   - Invalid or expired tokens will be rejected

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [google-auth-library Documentation](https://github.com/googleapis/google-auth-library-nodejs)
