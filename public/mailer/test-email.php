<?php
/**
 * Email Handler Test Script
 * 
 * This script tests the email functionality programmatically
 * using the configured SMTP credentials from config.mail.php
 */

// Set error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Test data
$testData = [
    'name' => 'Test User from CCIDBD',
    'email' => 'hello@ccidbd.com',
    'message' => 'This is a test message from the PHPMailer email handler for CCIDBD. If you receive this email, the configuration is working correctly! Timestamp: ' . date('Y-m-d H:i:s')
];

// Simulate POST request
$_POST = $testData;
$_SERVER['REQUEST_METHOD'] = 'POST';

echo "<h2>PHPMailer Email Handler Test</h2>\n";
echo "<p>Testing with SMTP credentials from config.mail.php...</p>\n";

echo "<h3>Test Data:</h3>\n";
echo "<ul>\n";
echo "<li><strong>Name:</strong> " . htmlspecialchars($testData['name']) . "</li>\n";
echo "<li><strong>Email:</strong> " . htmlspecialchars($testData['email']) . "</li>\n";
echo "<li><strong>Message:</strong> " . htmlspecialchars($testData['message']) . "</li>\n";
echo "</ul>\n";

echo "<h3>Sending Email...</h3>\n";

// Load PHPMailer classes
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
require_once 'phpmailer/Exception.php';

// Use PHPMailer namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Use output buffering to capture the response without headers
ob_start();

try {
    // Load configuration
    $config = require_once 'config.mail.php';
    
    // Validate and sanitize input data
    $name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
    
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
    
    // Additional validation rules
    if (strlen($name) > 100) {
        throw new Exception('Name must be less than 100 characters.');
    }
    
    if (strlen($email) > 254) {
        throw new Exception('Email address is too long.');
    }
    
    if (strlen($message) > 5000) {
        throw new Exception('Message must be less than 5000 characters.');
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
                <h2>New Contact Form Submission</h2>
                <p>You have received a new message from your website contact form.</p>
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
    $textBody = "New Contact Form Submission\n\n";
    $textBody .= "Name: " . $name . "\n";
    $textBody .= "Email: " . $email . "\n";
    $textBody .= "Message:\n" . $message . "\n\n";
    $textBody .= "Submitted: " . date('Y-m-d H:i:s T') . "\n";
    
    $mail->AltBody = $textBody;
    
    // Send the email
    $mail->send();
    
    // Success response
    $response = [
        'status' => 'success',
        'message' => 'Email sent successfully! Thank you for your message.'
    ];
    
} catch (Exception $e) {
    // Error response
    $response = [
        'status' => 'error',
        'message' => 'Failed to send email: ' . $e->getMessage()
    ];
}

$output = ob_get_clean();

echo "<div style='background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 10px 0;'>\n";
echo "<strong>SMTP Debug Output:</strong><br>\n";
echo "<pre>" . htmlspecialchars($output) . "</pre>\n";
echo "</div>\n";

echo "<h3>Response:</h3>\n";

if (isset($response)) {
    echo "<ul>\n";
    echo "<li><strong>Status:</strong> " . htmlspecialchars($response['status']) . "</li>\n";
    echo "<li><strong>Message:</strong> " . htmlspecialchars($response['message']) . "</li>\n";
    echo "</ul>\n";
    
    if ($response['status'] === 'success') {
        echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 4px; margin: 10px 0;'>\n";
        echo "<strong>✅ SUCCESS:</strong> Email sent successfully!\n";
        echo "</div>\n";
    } else {
        echo "<div style='background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 4px; margin: 10px 0;'>\n";
        echo "<strong>❌ ERROR:</strong> Email sending failed.\n";
        echo "</div>\n";
    }
} else {
    echo "<div style='background-color: #fff3cd; color: #856404; padding: 15px; border-radius: 4px; margin: 10px 0;'>\n";
    echo "<strong>⚠️ WARNING:</strong> No response generated.\n";
    echo "</div>\n";
}

echo "<h3>Configuration Check:</h3>\n";
$config = require 'config.mail.php';
echo "<ul>\n";
echo "<li><strong>SMTP Host:</strong> " . htmlspecialchars($config['smtp']['host']) . "</li>\n";
echo "<li><strong>SMTP Port:</strong> " . htmlspecialchars($config['smtp']['port']) . "</li>\n";
echo "<li><strong>SMTP Security:</strong> " . htmlspecialchars($config['smtp']['secure']) . "</li>\n";
echo "<li><strong>From Email:</strong> " . htmlspecialchars($config['from']['email']) . "</li>\n";
echo "<li><strong>To Email:</strong> " . htmlspecialchars($config['to']['email']) . "</li>\n";
echo "<li><strong>Debug Mode:</strong> " . ($config['settings']['debug'] ? 'Enabled' : 'Disabled') . "</li>\n";
echo "</ul>\n";

echo "<p><a href='test.html'>← Back to Interactive Test Form</a> | <a href='send-email.php' onclick='return false;'>Direct API Test (use POST)</a></p>\n";
?>