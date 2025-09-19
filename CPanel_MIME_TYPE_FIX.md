# Fixing MIME Type Issues on cPanel for Next.js Static Export

## Problem Summary

After deploying your Next.js static export to cPanel, you're encountering MIME type errors in the browser console:

```
Refused to apply style from 'https://earthib.com/_next/static/css/xxxx.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

Refused to execute script from 'https://earthib.com/_next/static/chunks/xxxx.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

## Root Cause

The issue occurs because cPanel's Apache server is not properly configured to serve CSS and JavaScript files with their correct MIME types. Instead, when a file is not found or cannot be served properly, Apache returns a 404 HTML error page with MIME type `text/html`, which the browser refuses to interpret as CSS or JavaScript.

## Solution

### 1. Verify Your Deployment

First, ensure you're using the correct deployment process:

1. Build your project:
   ```bash
   npm run build
   ```

2. The static files are automatically exported to the `out` directory with the correct structure:
   ```
   out/
   ├── _next/
   │   └── static/
   │       ├── css/
   │       │   └── *.css
   │       └── chunks/
   │           └── *.js
   ├── index.html
   ├── .htaccess
   └── other static files...
   ```

3. Upload ALL files from the `out` directory to your cPanel hosting (public_html or subdirectory)

### 2. Updated .htaccess Configuration

Your [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/.htaccess) file already includes the correct MIME type definitions, but let's verify it has all the necessary configurations:

```apache
# Redirect all requests to index.html for client-side routing
RewriteEngine On
RewriteBase /

# Handle HTTPS redirect
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Correct MIME types for static assets
AddType text/css .css
AddType application/javascript .js
AddType application/json .json
AddType image/svg+xml .svg
AddType image/png .png
AddType image/jpeg .jpg .jpeg
AddType image/gif .gif
AddType font/woff .woff
AddType font/woff2 .woff2
AddType application/font-woff .woff
AddType application/font-woff2 .woff2
AddType application/vnd.ms-fontobject .eot
AddType font/truetype .ttf

# Handle trailing slash
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} /$
RewriteRule ^(.+)/$ /$1 [R=301,L]

# Handle SPA routing - exclude actual files and directories
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L,QSA]

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/json "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

### 3. Verify File Upload

Ensure all files are uploaded correctly:

1. Check that the `_next` directory and all its subdirectories are uploaded
2. Verify that CSS files in `_next/static/css/` are present
3. Verify that JavaScript files in `_next/static/chunks/` are present
4. Confirm that the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/.htaccess) file is uploaded (it's a hidden file, so make sure your FTP client shows hidden files)

### 4. Check File Permissions

Set correct file permissions on cPanel:

1. CSS files: 644
2. JavaScript files: 644
3. All other files: 644
4. Directories: 755

In cPanel File Manager:
1. Select the files/directories
2. Right-click and choose "Change Permissions"
3. Set appropriate permissions as listed above

### 5. Clear Browser Cache

After making changes:
1. Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache completely
3. Try accessing your site in an incognito/private browsing window

### 6. Test MIME Types

Create a simple test file to verify MIME types are working:

1. Create `test-mime.html` in your public directory:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>MIME Type Test</title>
       <link rel="stylesheet" href="/_next/static/css/dcd7785fa79e9466.css">
   </head>
   <body>
       <h1>MIME Type Test Page</h1>
       <p>If styles are applied, MIME types are working correctly.</p>
   </body>
   </html>
   ```

2. After deploying, check the Network tab in browser developer tools:
   - Look for the CSS file request
   - Check that the response headers include `Content-Type: text/css`

### 7. Alternative Solutions if the Above Doesn't Work

#### Option 1: Contact Your Hosting Provider
Some shared hosting providers have restrictions on MIME types. Contact your hosting provider to ensure they support proper MIME type serving for static assets.

#### Option 2: Use a Different Hosting Solution
Consider using hosting providers that are optimized for static sites:
- Vercel (official Next.js hosting)
- Netlify
- GitHub Pages
- Firebase Hosting

#### Option 3: Manual MIME Type Configuration
If you have access to cPanel's MIME Types section:
1. Log into cPanel
2. Look for "MIME Types" or "Apache Handlers"
3. Add or verify these MIME types:
   - Extension: `.css` → MIME Type: `text/css`
   - Extension: `.js` → MIME Type: `application/javascript`

## Troubleshooting Checklist

Before contacting support, verify:

- [ ] All files from the `out` directory are uploaded
- [ ] The [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/.htaccess) file is uploaded
- [ ] File permissions are set correctly
- [ ] Browser cache is cleared
- [ ] You're accessing the correct URL
- [ ] No ad blockers or security extensions are interfering

## Prevention for Future Deployments

1. Always use the provided deployment scripts
2. Verify the file structure before uploading
3. Test with a simple page first
4. Check browser console for errors after deployment
5. Keep a backup of working files

## If Problems Persist

1. Check cPanel error logs for more details
2. Try uploading to a subdirectory first to test
3. Contact your hosting provider's support team