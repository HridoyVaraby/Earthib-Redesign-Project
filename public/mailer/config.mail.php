<?php
/**
 * Email Configuration File
 * 
 * This file contains SMTP credentials and email routing settings.
 * Update these values for each project deployment.
 * 
 * SECURITY NOTE: Keep this file outside of public web directory in production
 * or ensure your .htaccess file blocks access to .php files in this directory.
 */

// SMTP Server Configuration
$emailConfig = [
    // SMTP Settings
    'smtp' => [
        'host'     => 'mail.earthib.com',          // SMTP server hostname
        'username' => 'info@earthib.com',          // SMTP username
        'password' => ')bYbe!XIz7)mB)NE',          // SMTP password
        'port'     => 465,                         // SMTP port (465 for SSL)
        'secure'   => 'ssl',                       // Encryption: 'ssl' for port 465
    ],
    
    // Email Routing
    'from' => [
        'email' => 'info@earthib.com',             // From email address
        'name'  => 'Website Contact Form',         // From name
    ],
    
    'to' => [
        'email' => 'hello@ccidbd.com',             // Recipient email address
        'name'  => 'CCIDBD Team',                  // Recipient name
    ],
    
    // Email Settings
    'settings' => [
        'charset'     => 'UTF-8',               // Email charset
        'subject'     => 'New Contact Form Submission', // Default subject
        'reply_to'    => true,                  // Set reply-to to sender's email
        'debug'       => false,                 // Debug mode (set to true for troubleshooting)
    ]
];

// Example configurations for common email providers:

/*
// Gmail Configuration
$emailConfig['smtp'] = [
    'host'     => 'smtp.gmail.com',
    'username' => 'your-email@gmail.com',
    'password' => 'your-app-password',  // Generate app password in Google Account settings
    'port'     => 587,
    'secure'   => 'tls',
];

// Outlook/Hotmail Configuration
$emailConfig['smtp'] = [
    'host'     => 'smtp-mail.outlook.com',
    'username' => 'your-email@outlook.com',
    'password' => 'your-password',
    'port'     => 587,
    'secure'   => 'tls',
];

// cPanel/Shared Hosting Configuration
$emailConfig['smtp'] = [
    'host'     => 'mail.yourdomain.com',    // Usually mail.yourdomain.com
    'username' => 'contact@yourdomain.com', // Full email address
    'password' => 'your-email-password',
    'port'     => 587,                      // Or 465 for SSL
    'secure'   => 'tls',                    // Or 'ssl'
];
*/

// Return the configuration array
return $emailConfig;
?>