# Modular PHPMailer Email Sender

A reusable, drop-in PHP email handler using PHPMailer for static React websites hosted on cPanel. This module provides secure SMTP email sending with minimal configuration required per project.

## Features

- ✅ **Secure SMTP Authentication** - Works with Gmail, Outlook, and cPanel email
- ✅ **Input Validation & Sanitization** - Prevents XSS and validates all form data
- ✅ **JSON API Response** - Returns structured responses for frontend integration
- ✅ **HTML & Plain Text Emails** - Sends professional-looking emails with fallback
- ✅ **CORS Support** - Ready for frontend integration
- ✅ **Portable Design** - Copy folder and update config, that's it!
- ✅ **React Integration Guide** - Complete documentation for AI coders
- ✅ **Debug Mode** - Built-in debugging for troubleshooting

## Quick Start

### 1. Files Included

```
mailer/
├── send-email.php          # Main email handler
├── config.mail.php         # SMTP configuration
├── phpmailer/              # PHPMailer library files
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
├── form_setup_guide.md     # React integration guide
├── test.html              # Test form for verification
└── README.md              # This file
```

### 2. Configuration

Edit `config.mail.php` with your SMTP settings:

```php
$emailConfig = [
    'smtp' => [
        'host'     => 'smtp.gmail.com',
        'username' => 'your-email@gmail.com',
        'password' => 'your-app-password',
        'port'     => 587,
        'secure'   => 'tls',
    ],
    'from' => [
        'email' => 'your-email@gmail.com',
        'name'  => 'Website Contact Form',
    ],
    'to' => [
        'email' => 'recipient@example.com',
        'name'  => 'Website Owner',
    ],
];
```

### 3. Test the Setup

1. Upload the `mailer/` folder to your web server
2. Update SMTP credentials in `config.mail.php`
3. Open `test.html` in your browser
4. Submit the test form to verify email delivery

### 4. Integration

For React integration, follow the complete guide in `form_setup_guide.md`.

## API Reference

### Endpoint
```
POST /mailer/send-email.php
```

### Request Format
```
Content-Type: application/x-www-form-urlencoded

name=John+Doe&email=john@example.com&message=Hello+world
```

### Response Format

**Success:**
```json
{
  "status": "success",
  "message": "Email sent successfully! Thank you for your message."
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Failed to send email: [error details]"
}
```

## Validation Rules

- **name**: Required, max 100 characters, stripped of HTML tags
- **email**: Required, valid email format, max 254 characters
- **message**: Required, max 5000 characters, stripped of HTML tags

## Common SMTP Configurations

### Gmail
```php
'smtp' => [
    'host'     => 'smtp.gmail.com',
    'username' => 'your-email@gmail.com',
    'password' => 'your-app-password',  // Generate in Google Account settings
    'port'     => 587,
    'secure'   => 'tls',
],
```

### Outlook/Hotmail
```php
'smtp' => [
    'host'     => 'smtp-mail.outlook.com',
    'username' => 'your-email@outlook.com',
    'password' => 'your-password',
    'port'     => 587,
    'secure'   => 'tls',
],
```

### cPanel/Shared Hosting
```php
'smtp' => [
    'host'     => 'mail.yourdomain.com',
    'username' => 'contact@yourdomain.com',
    'password' => 'your-email-password',
    'port'     => 587,  // or 465 for SSL
    'secure'   => 'tls', // or 'ssl'
],
```

## Deployment

### For React Projects

1. Build your React project: `npm run build`
2. Upload build contents to `public_html/`
3. Upload `mailer/` folder to `public_html/mailer/`
4. Update `config.mail.php` with your SMTP settings
5. Test using `public_html/mailer/test.html`

### File Permissions

Ensure proper permissions on your hosting:
```bash
chmod 755 public_html/mailer/
chmod 644 public_html/mailer/*.php
chmod 644 public_html/mailer/phpmailer/*.php
```

## Troubleshooting

### Email Not Sending

1. **Enable Debug Mode**: Set `'debug' => true` in `config.mail.php`
2. **Check SMTP Credentials**: Verify username, password, and server settings
3. **Test with Different Port**: Try port 465 with SSL instead of 587 with TLS
4. **Check Server Logs**: Look for PHP errors in your hosting control panel

### CORS Issues

If making requests from a different domain, ensure the mailer folder is on the same domain as your frontend.

### Common Errors

- **Authentication Failed**: Check SMTP username/password
- **Connection Timeout**: Verify SMTP host and port
- **Invalid Recipients**: Check 'to' email address in config
- **SSL Certificate Issues**: Try using 'tls' instead of 'ssl'

## Security Features

- **Input Sanitization**: All inputs are stripped of HTML tags
- **Email Validation**: Server-side email format validation
- **Length Limits**: Prevents oversized submissions
- **CORS Headers**: Proper cross-origin request handling
- **Error Logging**: Debug mode logs errors securely

## Requirements

- PHP 7.4 or higher
- SMTP server access
- cPanel hosting or similar PHP environment

## License

This project uses PHPMailer which is licensed under LGPL 2.1. The wrapper code is provided as-is for educational and commercial use.

## Support

This module is designed to be self-contained and reusable. For issues:

1. Check the troubleshooting section above
2. Verify your SMTP configuration
3. Test with the included `test.html` file
4. Enable debug mode for detailed error messages

---

**Version**: 1.0  
**Compatible with**: React, Vue, Angular, and any frontend framework  
**Hosting**: cPanel, shared hosting, VPS