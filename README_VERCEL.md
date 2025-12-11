# Deploying OptimizeAI to Vercel

## Prerequisites
1. A Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed: `npm i -g vercel`
3. Your OpenAI API key

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (for first deployment)
   - Project name: **optimizeai** (or your preferred name)
   - Directory: **./** (current directory)
   - Override settings? **No**

4. **Set Environment Variable**:
   ```bash
   vercel env add OPENAI_API_KEY
   ```
   Enter your OpenAI API key when prompted.

5. **Redeploy with environment variable**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Add Environment Variable**:
   - In your Vercel project settings
   - Go to "Environment Variables"
   - Add `OPENAI_API_KEY` with your OpenAI API key value
   - Select all environments (Production, Preview, Development)

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your site

## Project Structure

```
optimizeai/
├── api/
│   └── analyze.py          # Vercel serverless function
├── pages/                  # HTML pages
├── index.html              # Landing page
├── tool.html               # Main tool page
├── script.js               # Frontend JavaScript
├── style.css               # Styles
├── vercel.json             # Vercel configuration
└── requirements.txt        # Python dependencies
```

## Environment Variables

Make sure to set these in Vercel (Settings → Environment Variables):

### Required:
- `OPENAI_API_KEY` - Your OpenAI API key

### For Contact Form (SMTP):
- `SMTP_HOST` - SMTP server hostname (e.g., `smtp.gmail.com`)
- `SMTP_PORT` - SMTP port (e.g., `587`)
- `SMTP_USER` - Your SMTP email address
- `SMTP_PASSWORD` - Your SMTP password or app password
- `RECIPIENT_EMAIL` - Email address to receive contact form submissions (optional, defaults to SMTP_USER)

See `SMTP_SETUP.md` for detailed SMTP configuration instructions.

## Testing Locally

To test the Vercel setup locally:
```bash
vercel dev
```

This will start a local server that mimics Vercel's environment.

## Notes

- The API endpoint `/api/analyze` is automatically routed to the Python serverless function
- All static files (HTML, CSS, JS) are served directly by Vercel
- The site will be available at `https://your-project.vercel.app`

