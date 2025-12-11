# SMTP Setup Guide for Contact Form

This guide explains how to set up SMTP email functionality for the OptimizeAI contact form.

## Environment Variables

You need to set the following environment variables in your Vercel project:

### Required Variables

1. **SMTP_HOST** - Your SMTP server hostname
   - Gmail: `smtp.gmail.com`
   - Outlook: `smtp-mail.outlook.com`
   - Custom: Your SMTP server address

2. **SMTP_PORT** - Your SMTP server port
   - Gmail: `587` (TLS) or `465` (SSL)
   - Outlook: `587`
   - Default: `587`

3. **SMTP_USER** - Your SMTP username/email
   - Example: `your-email@gmail.com`

4. **SMTP_PASSWORD** - Your SMTP password or app password
   - For Gmail: Use an [App Password](https://support.google.com/accounts/answer/185833)
   - For Outlook: Use your account password or app password

5. **RECIPIENT_EMAIL** (Optional) - Email address to receive contact form submissions
   - Default: Uses `SMTP_USER` if not set
   - Example: `support@optimizeai.com`

## Setting Up in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its corresponding value
4. Make sure to select the appropriate environments (Production, Preview, Development)
5. Redeploy your application for changes to take effect

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to **Security** → **2-Step Verification**
   - Scroll down to **App passwords**
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Set Environment Variables**:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

## Outlook Setup

1. **Set Environment Variables**:
   ```
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=your-email@outlook.com
   SMTP_PASSWORD=your-password
   RECIPIENT_EMAIL=your-email@outlook.com
   ```

## Custom SMTP Server

If you're using a custom SMTP server (e.g., SendGrid, Mailgun, AWS SES):

1. **Set Environment Variables**:
   ```
   SMTP_HOST=your-smtp-server.com
   SMTP_PORT=587
   SMTP_USER=your-username
   SMTP_PASSWORD=your-password
   RECIPIENT_EMAIL=recipient@example.com
   ```

## Testing

After setting up the environment variables:

1. Deploy your application to Vercel
2. Navigate to the contact page
3. Fill out and submit the contact form
4. Check the recipient email inbox for the message

## Troubleshooting

### "SMTP credentials not configured" error
- Make sure all required environment variables are set in Vercel
- Redeploy your application after adding environment variables

### "Failed to send email" error
- Verify your SMTP credentials are correct
- Check that your SMTP server allows connections from Vercel's IP addresses
- For Gmail, make sure you're using an App Password, not your regular password
- Verify the SMTP_PORT is correct for your provider

### Emails not received
- Check your spam/junk folder
- Verify the RECIPIENT_EMAIL is correct
- Check SMTP server logs if available

## Security Notes

- Never commit SMTP credentials to your repository
- Always use environment variables for sensitive information
- Consider using a dedicated email service (SendGrid, Mailgun) for production
- Regularly rotate your SMTP passwords

