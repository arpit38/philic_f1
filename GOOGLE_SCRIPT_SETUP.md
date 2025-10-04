# Google Apps Script Setup Instructions

Follow these steps to set up the email forwarding using Google Apps Script:

## ✅ Current Status

**Your Google Script URL is already configured!**
- URL: `https://script.google.com/macros/s/AKfycbzYOxpeOoA5kTgyeA349DE7GXEzDQpFe-pUUsmuB3GNm8iGddNz9_Ia6HDWNSGS3g7z/exec`
- This URL is hardcoded in the API route, so no environment variable is needed.

## Step 1: Verify Google Apps Script Deployment

1. Go to [Google Apps Script](https://script.google.com/)
2. Find your "Philic Enquiry Handler" project (or create a new one if it doesn't exist)
3. Make sure the code from `scripts/google-apps-script.txt` is deployed

## Step 2: Update the Script Code (If Needed)

1. Open your Google Apps Script project
2. Copy the entire code from `scripts/google-apps-script.txt`
3. Paste it into the Google Apps Script editor (replacing any old code)
4. Click the **Save** icon (💾)

## Step 3: Verify Deployment Settings

1. Click on **Deploy** → **Manage deployments**
2. Check that your deployment has these settings:
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
3. If settings are wrong, click the edit icon (pencil) and update them
4. The Web App URL should match: `https://script.google.com/macros/s/AKfycbzYOxpeOoA5kTgyeA349DE7GXEzDQpFe-pUUsmuB3GNm8iGddNz9_Ia6HDWNSGS3g7z/exec`

## Step 4: Test the Form

1. Submit a test enquiry through your website
2. Check the email inbox at **philic.agro@gmail.com**
3. You should receive an email with the enquiry details
4. Check the browser console (F12) for debug logs starting with `[v0]`

## Troubleshooting

### "Moved Temporarily" or HTML Redirect Errors:

**This is the most common issue!** It means the script isn't properly deployed or accessible.

**Solutions:**
1. **Re-deploy the script:**
   - Go to your Google Apps Script project
   - Click **Deploy** → **New deployment**
   - Choose **Web app**
   - Set "Execute as" to **Me**
   - Set "Who has access" to **Anyone**
   - Click **Deploy** and authorize if needed
   - Copy the new `/exec` URL
   - Update the URL in `app/api/send-enquiry/route.tsx` (line 10)

2. **Check authorization:**
   - The script must be authorized to send emails on your behalf
   - Go to **Deploy** → **Test deployments** and run a test
   - If you see authorization errors, click **Authorize** and complete the flow

3. **Verify the URL format:**
   - Correct: `https://script.google.com/macros/s/XXXXX/exec`
   - Wrong: `https://script.googleusercontent.com/...` (causes redirects)

### Emails Not Being Received:

1. **Check Google Apps Script logs:**
   - In your script project, click **Executions** (left sidebar)
   - Look for recent executions and any error messages
   
2. **Check Gmail spam folder:**
   - The emails might be filtered as spam initially
   
3. **Verify email address:**
   - Make sure `philic.agro@gmail.com` is correct in the script (line 24)

4. **Test the script directly:**
   - In Google Apps Script editor, select the `testDoPost` function
   - Click **Run**
   - Check if you receive a test email

### Authorization Issues:

1. **Re-authorize the script:**
   - Click **Deploy** → **Test deployments**
   - Click **Run** and follow authorization prompts
   - You may need to click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow** to grant Gmail permissions

2. **Check Google account:**
   - Make sure you're signed in with the correct Google account
   - The account must have access to send emails

### Form Submission Fails:

1. **Check browser console (F12):**
   - Look for `[v0]` debug messages
   - These will show exactly what's being sent and received

2. **Check network tab:**
   - Open browser DevTools (F12) → Network tab
   - Submit the form
   - Look for the `/api/send-enquiry` request
   - Check the response to see what error is returned

3. **Verify all required fields:**
   - Name, Email, and Product are required
   - Make sure these are filled in before submitting

## Need to Update the Script?

If you need to make changes to the Google Apps Script:

1. Edit the code in Google Apps Script editor
2. Click **Save**
3. Click **Deploy** → **Manage deployments**
4. Click the edit icon (pencil) next to your deployment
5. Click **Version** → **New version**
6. Click **Deploy**
7. The URL stays the same - no code changes needed!

## Email Configuration

**Current recipient:** philic.agro@gmail.com

To change the recipient email:
1. Edit line 24 in `scripts/google-apps-script.txt`
2. Update the Google Apps Script code
3. Create a new version (see "Need to Update the Script?" above)

## Debug Mode

The API route includes extensive debug logging. To see what's happening:

1. Open browser DevTools (F12)
2. Go to the Console tab
3. Submit an enquiry
4. Look for messages starting with `[v0]`
5. These will show:
   - Form data being sent
   - Google Script URL being called
   - Response status and content
   - Any errors that occur

This helps identify exactly where the issue is occurring.
