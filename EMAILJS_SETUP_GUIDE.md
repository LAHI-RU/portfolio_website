# EmailJS Setup Guide for Contact Form

Your contact form is now configured to send emails to **lahiiru.dananjaya@gmail.com** using EmailJS. Follow these steps to complete the setup:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or any other email service
4. Click **Connect Account** and authorize EmailJS to send emails
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template configuration:

**Template Settings:**

- **Template Name:** Portfolio Contact Form
- **To Email:** `lahiiru.dananjaya@gmail.com`
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **Subject:** `Portfolio Contact: {{subject}}`

**Template Content (Body):**

```
New message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Click **Save** and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (it looks like: `your_public_key_here`)
3. Copy this key

## Step 5: Update Your Code

Open `script.js` and replace the placeholder values with your actual IDs:

**Line to find:**

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

**Replace with:**

```javascript
emailjs.init("your_actual_public_key_here");
```

**Line to find:**

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

**Replace with:**

```javascript
emailjs.send('your_service_id', 'your_template_id', {
```

## Step 6: Test Your Form

1. Open your portfolio website
2. Fill out the contact form
3. Click **Send Message**
4. Check `lahiiru.dananjaya@gmail.com` for the email
5. Also check the **Spam folder** if you don't see it

## Example Configuration

Here's what your updated code should look like:

```javascript
// Initialize EmailJS with your Public Key
emailjs.init("AbCdEfGhIjKlMnOp"); // Your actual public key

// Send email
emailjs.send("service_xyz123", "template_abc456", {
  from_name: data.name,
  from_email: data.email,
  subject: data.subject,
  message: data.message,
  to_email: "lahiiru.dananjaya@gmail.com",
});
```

## EmailJS Free Tier Limits

- **200 emails per month** (Free tier)
- Should be sufficient for a portfolio site
- Upgrade available if you need more

## Troubleshooting

### Emails Not Arriving?

1. Check your spam/junk folder
2. Verify your Service ID and Template ID are correct
3. Make sure your Public Key is correctly set
4. Check the browser console for any errors
5. Verify your email service is connected in EmailJS dashboard

### Getting Errors?

- Open browser Developer Tools (F12)
- Go to Console tab
- Try sending the form
- Check for any error messages
- Common issues:
  - Wrong Service ID or Template ID
  - Public Key not initialized
  - Email service not connected

## Security Notes

✅ **Your email address is safe** - It's only visible in the EmailJS template (server-side)
✅ **No backend required** - EmailJS handles everything securely
✅ **Free to use** - Up to 200 emails/month on the free plan

## Alternative Email Services (If Needed)

If you prefer not to use EmailJS, here are alternatives:

1. **Formspree** - Similar to EmailJS
2. **Netlify Forms** - If hosting on Netlify
3. **Web3Forms** - Simple form backend
4. **GetForm** - Form backend service

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**That's it!** Your contact form will now send emails directly to your Gmail inbox. 🎉
