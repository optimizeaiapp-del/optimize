# Supabase Authentication Setup

This project uses Supabase for user authentication. Follow these steps to set up Supabase authentication:

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: OptimizeAI (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
5. Click "Create new project"

## 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL**: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - **anon public key**: Your public/anonymous key

## 3. Configure the Application

1. Open `supabase-config.js` in the root directory
2. Replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your Project URL
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your anon public key
   ```

## 4. Configure Email Authentication (Optional)

By default, Supabase requires email confirmation. To disable it for development:

1. Go to **Authentication** → **Providers** → **Email**
2. Toggle "Confirm email" to OFF (for development only)
3. For production, keep email confirmation enabled

## 5. Test the Authentication

1. Start your local server
2. Navigate to the login page
3. Try creating a new account
4. Try signing in with your credentials

## Features Implemented

- ✅ User sign up with email and password
- ✅ User sign in with email and password
- ✅ Session management
- ✅ Protected routes (tool page, account page)
- ✅ User profile display
- ✅ Logout functionality
- ✅ Update user name
- ✅ Update user email
- ✅ Update user password

## Security Notes

- Passwords are securely hashed by Supabase
- Sessions are managed by Supabase
- Email confirmation can be enabled for additional security
- The anon key is safe to use in client-side code (it's public)
- Row Level Security (RLS) policies can be added for additional protection

## Troubleshooting

### "Invalid API key" error
- Make sure you've updated `supabase-config.js` with your actual credentials
- Check that you're using the **anon public key**, not the service role key

### Email confirmation required
- If you see a message about checking your email, either:
  - Check your email and click the confirmation link
  - Or disable email confirmation in Supabase settings (development only)

### Session not persisting
- Make sure localStorage is enabled in your browser
- Check browser console for any errors
- Verify your Supabase project is active

