# MIME Type Troubleshooting Guide for cPanel Deployment

## Problem Description

After deploying the Next.js static export to cPanel, you're encountering MIME type errors in the browser console:

```
Refused to apply style from 'https://earthib.com/_next/static/css/xxxx.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

Refused to execute script from 'https://earthib.com/_next/static/chunks/xxxx.js' because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.
```

## Root Causes

1. **Missing MIME type definitions**: cPanel's Apache server isn't configured to serve CSS and JavaScript files with the correct MIME types
2. **Incorrect file paths**: The server is returning a 404 HTML error page (MIME type 'text/html') instead of the actual CSS/JS files
3. **Improper deployment structure**: Files aren't organized correctly for proper static asset serving

## Solutions Implemented

### 1. Updated .htaccess File

The [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/.htaccess) file now includes explicit MIME type definitions:

```apache
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
```

### 2. Corrected Deployment Process

Instead of manually copying files, we're now using Next.js's built-in export functionality:

```bash
npx next export
```

This ensures the proper file structure is maintained for static asset serving.

## Verification Steps

### 1. Check File Structure

After running the deployment script, verify the `out` directory structure:

```
out/
├── _next/
│   ├── static/
│   │   ├── css/
│   │   │   └── *.css
│   │   └── chunks/
│   │       └── *.js
├── index.html
├── .htaccess
└── other static files...
```

### 2. Test MIME Types

Create a simple test file to verify MIME types are working:

```html
<!DOCTYPE html>
<html>
<head>
    <title>MIME Type Test</title>
    <link rel="stylesheet" href="/test.css">
    <script src="/test.js"></script>
</head>
<body>
    <h1>MIME Type Test Page</h1>
</body>
</html>
```

### 3. Check Server Response Headers

Use browser developer tools to check the response headers for CSS/JS files:

1. Open Developer Tools (F12)
2. Go to the Network tab
3. Refresh the page
4. Look for CSS/JS requests
5. Check the "Content-Type" header in the response

It should show:
- `text/css` for CSS files
- `application/javascript` for JS files

## Additional Troubleshooting Steps

### 1. Clear Browser Cache

Sometimes cached files can cause issues:

- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache completely

### 2. Check cPanel MIME Types

Some cPanel installations allow you to configure MIME types:

1. Log into cPanel
2. Look for "MIME Types" or "Apache Handlers" section
3. Ensure proper MIME types are configured for:
   - `.css` → `text/css`
   - `.js` → `application/javascript`

### 3. Verify File Permissions

Ensure files have proper read permissions:

```bash
# In cPanel File Manager or via SSH
chmod 644 *.css
chmod 644 *.js
```

### 4. Check for Case Sensitivity Issues

Some servers are case-sensitive. Ensure file names match exactly:

- `_next/static/css/` not `_next/Static/CSS/`
- File extensions are lowercase

## Common Mistakes to Avoid

1. **Manual file copying**: Don't manually copy files from `.next/server/app/` - use `npx next export`
2. **Incomplete uploads**: Ensure all files are uploaded, especially hidden files like `.htaccess`
3. **Wrong upload directory**: Upload to the correct directory (public_html or subdirectory)
4. **Forgetting to rebuild**: Always run the build process before deploying

## If Problems Persist

1. **Check server logs**: Look at cPanel error logs for more details
2. **Contact hosting provider**: Some shared hosting providers have restrictions on MIME types
3. **Test with a simple static site**: Create a basic HTML/CSS/JS site to verify the hosting environment works correctly

## Prevention for Future Deployments

1. Always use the provided deployment scripts
2. Verify the file structure before uploading
3. Test with a simple page first
4. Check browser console for errors after deployment