<?php
/**
 * CCIDBD Email Handler Test Script
 * 
 * This script tests the email functionality for CCIDBD
 * using the configured SMTP credentials from config.mail.php
 * Fixed to avoid PHP header conflicts
 */

// Set error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load PHPMailer classes at the top level
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
require_once 'phpmailer/Exception.php';

// Use PHPMailer namespace at the top level
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Test data for CCIDBD
$testData = [
    'name' => 'Test User from CCIDBD',
    'email' => 'hello@ccidbd.com',
    'message' => 'This is a test message from the PHPMailer email handler for CCIDBD. If you receive this email, the configuration is working correctly! Timestamp: ' . date('Y-m-d H:i:s')
];

// Start output buffering to capture any debug output
ob_start();

$emailResult = null;
$debugOutput = '';

try {
    // Load configuration
    $config = require_once 'config.mail.php';
    
    // Validate and sanitize input data
    $name = trim(strip_tags($testData['name']));
    $email = trim(filter_var($testData['email'], FILTER_SANITIZE_EMAIL));
    $message = trim(strip_tags($testData['message']));
    
    // Input validation
    if (empty($name)) {
        throw new Exception('Name is required.');
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('A valid email address is required.');
    }
    
    if (empty($message)) {
        throw new Exception('Message is required.');
    }
    
    // Create PHPMailer instance
    $mail = new PHPMailer(true);
    
    // Enable debug mode if configured
    if ($config['settings']['debug']) {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    }
    
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = $config['smtp']['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp']['username'];
    $mail->Password   = $config['smtp']['password'];
    $mail->SMTPSecure = $config['smtp']['secure'];
    $mail->Port       = $config['smtp']['port'];
    $mail->CharSet    = $config['settings']['charset'];
    
    // Email settings
    $mail->setFrom($config['from']['email'], $config['from']['name']);
    $mail->addAddress($config['to']['email'], $config['to']['name']);
    
    // Set reply-to if enabled
    if ($config['settings']['reply_to']) {
        $mail->addReplyTo($email, $name);
    }
    
    // Email content
    $mail->isHTML(true);
    $mail->Subject = $config['settings']['subject'];
    
    // Create HTML email body
    $htmlBody = '
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-top: 5px; padding: 10px; background-color: #f8f9fa; border-radius: 3px; }
            .message-content { white-space: pre-line; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission - CCIDBD Test</h2>
                <p>You have received a new test message from the CCIDBD website contact form.</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</div>
                </div>
                <div class="field">
                    <div class="label">Message:</div>
                    <div class="value message-content">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</div>
                </div>
                <div class="field">
                    <div class="label">Submitted:</div>
                    <div class="value">' . date('Y-m-d H:i:s T') . '</div>
                </div>
            </div>
        </div>
    </body>
    </html>';
    
    $mail->Body = $htmlBody;
    
    // Create plain text version
    $textBody = "New Contact Form Submission - CCIDBD Test\n\n";
    $textBody .= "Name: " . $name . "\n";
    $textBody .= "Email: " . $email . "\n";
    $textBody .= "Message:\n" . $message . "\n\n";
    $textBody .= "Submitted: " . date('Y-m-d H:i:s T') . "\n";
    
    $mail->AltBody = $textBody;
    
    // Send the email
    $mail->send();
    
    // Success response
    $emailResult = [
        'status' => 'success',
        'message' => 'Email sent successfully to CCIDBD!'
    ];
    
} catch (Exception $e) {
    // Error response
    $emailResult = [
        'status' => 'error',
        'message' => 'Failed to send email: ' . $e->getMessage()
    ];
}

// Capture any debug output
$debugOutput = ob_get_clean();

// Load config for display
$config = require 'config.mail.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CCIDBD Email Test Results</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .success {
            background-color: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
            border: 1px solid #c3e6cb;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
            border: 1px solid #f5c6cb;
        }
        .debug {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
            border: 1px solid #dee2e6;
        }
        .config {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 4px;
            margin: 10px 0;
            border: 1px solid #ffeaa7;
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            max-height: 300px;
            overflow-y: auto;
        }
        .highlight {
            background-color: #ffffcc;
            padding: 2px 4px;
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CCIDBD PHPMailer Email Test Results</h1>
        
        <h2>Test Data Sent:</h2>
        <ul>
            <li><strong>Name:</strong> <?= htmlspecialchars($testData['name']) ?></li>
            <li><strong>Email:</strong> <span class="highlight"><?= htmlspecialchars($testData['email']) ?></span></li>
            <li><strong>Message:</strong> <?= htmlspecialchars($testData['message']) ?></li>
        </ul>
        
        <h2>Email Processing Result:</h2>
        <?php if (isset($emailResult)): ?>
            <div class="<?= $emailResult['status'] === 'success' ? 'success' : 'error' ?>">
                <strong><?= $emailResult['status'] === 'success' ? '✅ SUCCESS' : '❌ ERROR' ?>:</strong>
                <?= htmlspecialchars($emailResult['message']) ?>
            </div>
            
            <?php if ($emailResult['status'] === 'success'): ?>
                <p><strong>🎉 Email has been successfully sent to hello@ccidbd.com!</strong></p>
                <p>The recipient should receive a professionally formatted email with the test message.</p>
            <?php endif; ?>
        <?php else: ?>
            <div class="error">
                <strong>⚠️ WARNING:</strong> No result generated.
            </div>
        <?php endif; ?>
        
        <?php if (!empty($debugOutput)): ?>
            <h2>SMTP Debug Output:</h2>
            <div class="debug">
                <pre><?= htmlspecialchars($debugOutput) ?></pre>
            </div>
        <?php endif; ?>
        
        <h2>Current Configuration:</h2>
        <div class="config">
            <ul>
                <li><strong>SMTP Host:</strong> <?= htmlspecialchars($config['smtp']['host']) ?></li>
                <li><strong>SMTP Port:</strong> <?= htmlspecialchars($config['smtp']['port']) ?></li>
                <li><strong>SMTP Security:</strong> <?= htmlspecialchars($config['smtp']['secure']) ?></li>
                <li><strong>From Email:</strong> <?= htmlspecialchars($config['from']['email']) ?></li>
                <li><strong>To Email:</strong> <span class="highlight"><?= htmlspecialchars($config['to']['email']) ?></span></li>
                <li><strong>Debug Mode:</strong> <?= $config['settings']['debug'] ? 'Enabled' : 'Disabled' ?></li>
            </ul>
        </div>
        
        <h2>JSON API Response (for frontend integration):</h2>
        <div class="debug">
            <pre><?= json_encode($emailResult, JSON_PRETTY_PRINT) ?></pre>
        </div>
        
        <p>
            <a href="test.html">← Back to Interactive Test Form</a> | 
            <a href="README.md">View Documentation</a> |
            <a href="form_setup_guide.md">React Integration Guide</a>
        </p>
    </div>
</body>
</html>