# Quick Deployment Guide to Vercel

## Method 1: Deploy via Vercel Dashboard (Recommended - No CLI needed)

### Step 1: Prepare Your Code for GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Vercel deployment"
   ```

2. **Create a GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `optimizeai`)
   - **Don't** initialize with README, .gitignore, or license
   - Copy the repository URL

3. **Push to GitHub**:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/new
   - Sign in with GitHub (if not already signed in)

2. **Import Your Repository**:
   - Click "Import Git Repository"
   - Select your `optimizeai` repository
   - Click "Import"

3. **Configure Project**:
   - **Project Name**: `optimizeai` (or your preferred name)
   - **Framework Preset**: Other (Vercel will auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty
   - Click "Deploy"

4. **Add Environment Variables**:
   After the first deployment, go to:
   - **Settings** → **Environment Variables**
   - Add the following variables:

   **Required:**
   ```
   OPENAI_API_KEY = your-openai-api-key-here
   ```

   **For Contact Form (SMTP):**
   ```
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your-email@gmail.com
   SMTP_PASSWORD = your-app-password
   RECIPIENT_EMAIL = your-email@gmail.com
   ```

   - Select **all environments** (Production, Preview, Development)
   - Click "Save"

5. **Redeploy**:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click "Redeploy"
   - Your site will be live at `https://your-project.vercel.app`

## Method 2: Deploy via Vercel CLI (If you have Node.js)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add SMTP_HOST
   vercel env add SMTP_PORT
   vercel env add SMTP_USER
   vercel env add SMTP_PASSWORD
   vercel env add RECIPIENT_EMAIL
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Important Files for Deployment

✅ `vercel.json` - Vercel configuration (already configured)
✅ `api/analyze.py` - OpenAI analysis endpoint
✅ `api/contact.py` - SMTP contact form endpoint
✅ `.vercelignore` - Files to exclude from deployment

## Environment Variables Checklist

Before deploying, make sure you have:

- [ ] OpenAI API key
- [ ] SMTP credentials (if using contact form)
  - [ ] SMTP_HOST
  - [ ] SMTP_PORT
  - [ ] SMTP_USER
  - [ ] SMTP_PASSWORD
  - [ ] RECIPIENT_EMAIL

## Testing After Deployment

1. Visit your deployed URL: `https://your-project.vercel.app`
2. Test the main tool at `/tool.html`
3. Test the contact form at `/pages/contact.html`
4. Check that API endpoints work:
   - `/api/analyze` (for assignment analysis)
   - `/api/contact` (for contact form)

## Troubleshooting

- **Build fails**: Check that all Python files in `api/` are valid
- **API errors**: Verify environment variables are set correctly
- **Contact form not working**: Check SMTP credentials and ensure they're set for all environments
- **404 errors**: Make sure all HTML files are in the correct directories

## Support

For detailed SMTP setup, see `SMTP_SETUP.md`
For general Vercel info, see `README_VERCEL.md`

