# React Form Integration Guide for PHPMailer Email Handler

This guide provides step-by-step instructions for integrating a contact form in your React application with the PHPMailer email handler.

## Overview

The email handler is located at `/mailer/send-email.php` and expects POST requests with specific form fields. This guide shows you how to create a React form that works seamlessly with the PHP backend.

## Required Form Fields

Your form must include these three fields:

- `name` (string, required): Sender's full name
- `email` (string, required): Sender's valid email address  
- `message` (string, required): The message content

## React Component Example

Here's a complete React contact form component:

```jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      // Create FormData object for application/x-www-form-urlencoded
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/mailer/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      const result = await response.json();

      if (result.status === 'success') {
        setStatus('success');
        setResponseMessage(result.message);
        // Reset form on success
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Network error. Please try again later.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      
      {/* Status Messages */}
      {status === 'success' && (
        <div className="alert alert-success" role="alert">
          {responseMessage}
        </div>
      )}
      
      {status === 'error' && (
        <div className="alert alert-error" role="alert">
          {responseMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength="100"
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength="254"
            disabled={status === 'loading'}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            maxLength="5000"
            rows="6"
            disabled={status === 'loading'}
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="submit-button"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
```

## Key Implementation Points

### 1. Content-Type Header
**Critical**: Use `application/x-www-form-urlencoded` content type:

```javascript
headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
}
```

### 2. Form Data Encoding
Use `URLSearchParams` to properly encode form data:

```javascript
const formDataToSend = new URLSearchParams();
formDataToSend.append('name', formData.name);
formDataToSend.append('email', formData.email);
formDataToSend.append('message', formData.message);
```

### 3. Response Handling
The PHP handler returns JSON responses with this structure:

**Success Response:**
```json
{
  "status": "success",
  "message": "Email sent successfully! Thank you for your message."
}
```

**Error Response:**
```json
{
  "status": "error", 
  "message": "Failed to send email: [error details]"
}
```

### 4. Form Validation
Client-side validation should match server-side rules:
- Name: Required, max 100 characters
- Email: Required, valid email format, max 254 characters
- Message: Required, max 5000 characters

## Basic CSS Styling

```css
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.alert {
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
```

## Deployment Instructions

### Step 1: Build Your React Project
```bash
npm run build
# or
yarn build
```

### Step 2: Upload to cPanel
1. Upload the contents of your `dist/` or `build/` folder to `public_html/`
2. Upload the entire `mailer/` folder to `public_html/mailer/`

### Step 3: Configure Email Settings
Edit `public_html/mailer/config.mail.php`:

```php
// Update these values for your project
$emailConfig = [
    'smtp' => [
        'host'     => 'your-smtp-server.com',
        'username' => 'your-email@domain.com',
        'password' => 'your-email-password',
        'port'     => 587,
        'secure'   => 'tls',
    ],
    'from' => [
        'email' => 'your-email@domain.com',
        'name'  => 'Your Website Name',
    ],
    'to' => [
        'email' => 'recipient@domain.com',
        'name'  => 'Your Name',
    ],
    // ... rest of config
];
```

### Step 4: Test the Form
1. Visit your deployed website
2. Fill out and submit the contact form
3. Check that emails are being received
4. Monitor for any console errors

## Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure your form is on the same domain as the PHP handler
- Check that the `/mailer/` folder is accessible

**Email Not Sending:**
- Verify SMTP credentials in `config.mail.php`
- Enable debug mode: set `'debug' => true` in config
- Check server error logs

**Form Submission Fails:**
- Verify the Content-Type header is set correctly
- Check that all required fields are being sent
- Ensure the mailer path is correct (`/mailer/send-email.php`)

### Testing SMTP Configuration

Enable debug mode in `config.mail.php`:
```php
'settings' => [
    'debug' => true,  // Enable for troubleshooting
    // ...
]
```

This will output detailed SMTP debugging information to help diagnose connection issues.

## Security Notes

1. **File Permissions**: Ensure `config.mail.php` is not publicly accessible via web browser
2. **Input Validation**: The PHP handler includes server-side validation and sanitization
3. **Rate Limiting**: Consider implementing rate limiting for production use
4. **HTTPS**: Always use HTTPS in production to protect form data

## Optional Enhancements

### Add Loading State
The example includes a loading state that disables the form during submission.

### Add Client-Side Validation
Add real-time validation feedback before form submission:

```jsx
const validateEmail = (email) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validateForm = () => {
  const errors = {};
  
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
  if (!formData.message.trim()) errors.message = 'Message is required';
  
  return errors;
};
```

### Add reCAPTCHA
For production sites, consider adding Google reCAPTCHA to prevent spam.

---

## Support

This email handler is designed to be portable and reusable across multiple projects. Simply copy the `mailer/` folder to any cPanel hosting environment and update the configuration file for each project.

For technical issues, ensure:
1. PHP 7.4+ is available on your hosting
2. SMTP credentials are correct
3. The mailer folder has proper file permissions
4. Your hosting provider allows outbound SMTP connections