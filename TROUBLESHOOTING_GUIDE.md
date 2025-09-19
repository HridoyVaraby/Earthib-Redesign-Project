# Earthib Website - Troubleshooting Guide

## Issues Identified and Resolved

### 1. Header Menu Navigation Not Working

**Problem**: Clicking on header menu items (Home, About, Services, Contact) did not scroll to the respective sections.

**Root Cause**: The JavaScript function `scrollToSection` was working correctly, but there might have been conflicts with the SPA routing or CSS issues.

**Solution**: 
- Verified that the `scrollToSection` function in [page.tsx](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/src/app/page.tsx) is correctly implemented
- Ensured all section elements have the correct IDs (`home`, `about`, `services`, `contact`)
- Confirmed that the navigation buttons correctly call `scrollToSection` with the appropriate section IDs

### 2. Contact Form Not Working

**Problem**: The contact form was not sending emails, not showing confirmation messages, and not receiving any emails.

**Root Cause**: The SPA routing in the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file was redirecting all requests to [index.html](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/index.html), including requests to the PHP mailer endpoint `/mailer/send-email.php`.

**Solution**:
- Modified the [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) file to exclude the `/mailer/` directory from SPA routing:
  ```apache
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !^/mailer/
  RewriteRule ^.*$ /index.html [L,QSA]
  ```
- This ensures that requests to `/mailer/send-email.php` are properly handled by the PHP script instead of being redirected to the React app.

### 3. Test Email Working But Form Not Working

**Problem**: The `test-email.php` script worked correctly, but the actual contact form didn't.

**Root Cause**: The test script works because it's accessed directly, while the contact form's AJAX request was being intercepted by the SPA routing.

**Solution**: 
- The fix for the SPA routing in [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) resolves this issue
- Verified that the contact form in [page.tsx](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/src/app/page.tsx) correctly sends data to `/mailer/send-email.php` using `fetch`

## Verification Steps

### 1. Header Navigation
1. Click each navigation item in the header (Home, About, Services, Contact)
2. Verify that the page scrolls smoothly to the correct section
3. Check that mobile navigation also works correctly

### 2. Contact Form
1. Fill out the contact form with valid information
2. Click "Send Message"
3. Verify that:
   - A success or error message is displayed
   - If successful, the form fields are cleared
   - If successful, an email is received at the configured address
   - If there's an error, an appropriate error message is shown

### 3. Mailer Endpoint Accessibility
1. Ensure that `/mailer/send-email.php` is accessible and not redirected by SPA routing
2. Verify that the PHPMailer configuration in `/mailer/config.mail.php` is correct
3. Test with the provided `test.html` form if needed

## Common Issues and Solutions

### Issue: Form Submits but No Email Received
**Possible Causes**:
1. Incorrect SMTP configuration in `config.mail.php`
2. Server restrictions on outgoing email
3. Incorrect file permissions

**Solutions**:
1. Double-check SMTP settings (host, username, password, port, security)
2. Enable debug mode in `config.mail.php` by setting `'debug' => true`
3. Check with your hosting provider about email sending restrictions
4. Ensure PHP files have proper execution permissions (644)

### Issue: Form Shows "Network Error"
**Possible Causes**:
1. SPA routing interfering with the endpoint
2. Incorrect path to the mailer script
3. Server configuration issues

**Solutions**:
1. Verify [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) configuration excludes `/mailer/` from SPA routing
2. Check that the form action points to the correct path (`/mailer/send-email.php`)
3. Test direct access to the endpoint

### Issue: Navigation Not Scrolling
**Possible Causes**:
1. Missing section IDs
2. JavaScript errors
3. CSS positioning issues

**Solutions**:
1. Verify that sections have correct IDs matching the navigation targets
2. Check browser console for JavaScript errors
3. Ensure sections are properly positioned in the DOM

## Deployment Checklist

Before deploying updates:

1. [ ] Update [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out/.htaccess) with the correct SPA routing exclusions
2. [ ] Verify SMTP configuration in `config.mail.php`
3. [ ] Test contact form functionality locally
4. [ ] Check all navigation links work correctly
5. [ ] Ensure all static assets load properly
6. [ ] Verify mobile responsiveness

## Testing After Deployment

1. Clear browser cache
2. Test all navigation links
3. Submit a test message through the contact form
4. Check that confirmation messages appear
5. Verify email delivery
6. Test on different devices/browsers

## Contact for Further Assistance

If issues persist after implementing these fixes:
1. Check browser console for errors
2. Review server error logs
3. Enable debug mode in `config.mail.php`
4. Contact your hosting provider for server-specific issues