# OptimizeAI

Teacher-Specific Assignment Optimizer - A SaaS tool that helps students optimize their assignments to match their teacher's marking style.

## Setup Instructions

### 1. Install Dependencies (Already Done!)

Dependencies have been installed. The server uses Python 3 with Flask.

### 2. Configure OpenAI API Key

**IMPORTANT:** You need to set your OpenAI API key for the backend to work.

1. Get your OpenAI API key from: https://platform.openai.com/api-keys

2. Set the API key as an environment variable:
   ```bash
   export OPENAI_API_KEY='sk-your-actual-api-key-here'
   ```

   Or add it to your shell profile (`.zshrc` or `.bash_profile`) to make it permanent:
   ```bash
   echo "export OPENAI_API_KEY='sk-your-actual-api-key-here'" >> ~/.zshrc
   source ~/.zshrc
   ```

### 3. Start the Server

The server is already running! If you need to restart it:

```bash
python3 server.py
```

The server runs on `http://localhost:3000`

### 4. Open in Browser

Navigate to `http://localhost:3000` in your browser.

## Features

- **Teacher Profile Input**: Describe how your teacher marks assignments
- **Assignment Instructions**: Paste the assignment requirements and rubric
- **Draft Analysis**: Get detailed feedback on your assignment draft
- **Smart Rewrites**: Generate optimized versions based on rewrite strength (Light/Balanced/Max)

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python 3, Flask
- AI: OpenAI GPT-4o-mini

## Notes

- The backend server handles all OpenAI API calls securely
- Never expose your API key in the frontend code
- Make sure to add `.env` to your `.gitignore` file

