Here’s a clean, modular PRD (Product Requirements Document) for your reusable PHPMailer email sender module, designed to integrate seamlessly with static React projects deployed on cPanel. It’s structured for clarity, scalability, and reuse across client sites.

📄 Product Requirements Document (PRD)

🧩 Project Name

Modular PHPMailer Email Sender for Static React Sites

🎯 Objective

To build a reusable, drop-in PHP module that enables email sending via SMTP from static React websites hosted on cPanel. The module will use PHPMailer and be configurable per project via a simple config file. It will include a form integration guide to ensure consistent frontend implementation by AI coders or developers.

🧱 Scope

✅ In Scope

PHP-based email handler using PHPMailer

Configurable SMTP credentials via config.mail.php

JSON response for frontend integration

Markdown guide for React form setup (form_setup_guide.md)

Portable structure for deployment in public_html

❌ Out of Scope

Node.js or Express backend

Database storage or logging (optional future module)

File attachments (optional future enhancement)

📁 Folder Structure

public_html/
├── index.html (React build)
├── static/     (React assets)
├── mailer/
│   ├── config.mail.php
│   ├── send-email.php
│   ├── PHPMailer/
│   │   ├── PHPMailer.php
│   │   ├── SMTP.php
│   │   ├── Exception.php
│   └── form_setup_guide.md

⚙️ Functional Requirements

1. config.mail.php

Stores SMTP credentials and routing info

Editable per project

Must include:

host, username, password, port, secure

from_email, from_name, to_email, to_name

2. send-email.php

Accepts POST requests with name, email, message

Sanitizes inputs

Sends email via PHPMailer using SMTP

Returns JSON:

{ "status": "success", "message": "Email sent successfully" }

3. PHPMailer/

Contains required PHPMailer classes

Must be included manually or via Composer and copied to mailer/

4. form_setup_guide.md

Markdown file with instructions for AI coders

Specifies:

Required form fields

Submission method (fetch() with application/x-www-form-urlencoded)

Deployment steps

Notes on security and optional enhancements

🧪 Non-Functional Requirements

Must work on standard cPanel hosting with PHP 7.4+

No external dependencies beyond PHPMailer

Must be secure (no exposed credentials, input sanitization)

Must be portable across projects with minimal config changes

🚀 Deployment Instructions

Build React project (npm run build)

Upload contents of dist/ to public_html/

Upload mailer/ folder to public_html/

Update config.mail.php with project-specific SMTP credentials

Test form submission and email delivery

📦 Deliverables

mailer/ folder with all required files

form_setup_guide.md for frontend integration

Sample React form snippet (optional)

README (optional for client handoff)

🧠 Future Enhancements

File attachment support

SQLite or flat-file logging

CAPTCHA integration

CLI tool to scaffold mailer/ + React form combo

SMTP Credential: 
Username:info@earthib.com
Password:)bYbe!XIz7)mB)NE
Incoming Server:mail.earthib.com
IMAP Port: 993 POP3 Port: 995
Outgoing Server:mail.earthib.com
SMTP Port: 465