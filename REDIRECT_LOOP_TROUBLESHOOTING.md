# Redirect Loop Troubleshooting Guide

## Problem Description

The website is experiencing a redirect loop, causing all static assets (CSS, JavaScript files) to be served as `text/html` instead of their proper MIME types. This results in errors like:

```
Refused to apply style from 'https://earthib.com/_next/static/css/xxxx.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

Refused to execute script from 'https://earthib.com/_next/static/chunks/xxxx.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

## Root Cause

The redirect loop is caused by the HTTPS redirect rule in the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file. The rule was redirecting all HTTP requests to HTTPS, including requests for static assets, which was causing an infinite loop.

## Solution Implemented

The [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file has been updated with the following improvements:

1. **HTTPS Redirect Exclusions**: Added conditions to exclude static assets from HTTPS redirects:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteCond %{REQUEST_URI} !^/_next/
   RewriteCond %{REQUEST_URI} !^/mailer/
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

2. **SPA Routing Exclusions**: Ensured that static assets are excluded from SPA routing:
   ```apache
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_URI} !^/mailer/
   RewriteCond %{REQUEST_URI} !^/_next/
   RewriteCond %{REQUEST_URI} !^/favicon.ico$
   RewriteRule ^.*$ /index.html [L,QSA]
   ```

3. **MIME Type Definitions**: Verified that proper MIME types are defined for all static assets.

## Verification Steps

1. Check that the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file contains the correct exclusions for static assets
2. Verify that static assets are accessible directly (e.g., https://earthib.com/_next/static/css/xxxx.css)
3. Test that the HTTPS redirect works for pages but not for static assets
4. Confirm that the SPA routing works for pages but not for static assets

## Deployment Steps

1. Rebuild the project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `out` directory to cPanel, making sure to include the updated [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file

3. Clear your browser cache completely

4. Test the website by:
   - Loading the homepage
   - Checking that CSS and JavaScript files load correctly in the Network tab
   - Testing the contact form
   - Verifying navigation works correctly

## Common Issues and Solutions

### Issue: Redirect Loop Persists
**Solution**: 
- Double-check that the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file has the correct exclusions
- Ensure you've uploaded the updated [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file to cPanel
- Clear your browser cache and try again

### Issue: Static Assets Still Not Loading
**Solution**:
- Verify that the static files exist in the correct directories on the server
- Check file permissions (should be 644 for files, 755 for directories)
- Ensure that the server is not blocking access to these files

### Issue: Contact Form Not Working
**Solution**:
- Verify that the mailer directory is uploaded correctly
- Check that the PHP files have the correct permissions
- Test the mailer functionality using the test scripts

## Prevention for Future Deployments

1. Always use the provided deployment scripts
2. Verify the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) configuration before deploying
3. Test static asset loading after deployment
4. Clear browser cache when testing
5. Check browser console for errors

## If Problems Persist

1. Check server error logs for more details
2. Contact your hosting provider to ensure there are no server-level redirect rules
3. Test with a simple static HTML file to verify server configuration
4. Consider temporarily removing the HTTPS redirect to isolate the issue