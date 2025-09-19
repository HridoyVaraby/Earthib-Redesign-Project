#!/usr/bin/env node

// Script to verify the .htaccess configuration
const fs = require('fs');
const path = require('path');

console.log('Verifying .htaccess configuration...\n');

// Check if out directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  console.error('❌ Error: out directory not found');
  process.exit(1);
}

// Check .htaccess file
const htaccessPath = path.join(outDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
  console.log('✅ .htaccess file exists');
  
  // Check if HTTPS redirect excludes static assets
  if (htaccessContent.includes('RewriteCond %{REQUEST_URI} !^/_next/')) {
    console.log('✅ HTTPS redirect correctly excludes /_next/ directory');
  } else {
    console.warn('⚠️  HTTPS redirect may not correctly exclude /_next/ directory');
  }
  
  // Check if SPA routing excludes static assets
  if (htaccessContent.includes('RewriteCond %{REQUEST_URI} !^/_next/')) {
    console.log('✅ SPA routing correctly excludes /_next/ directory');
  } else {
    console.warn('⚠️  SPA routing may not correctly exclude /_next/ directory');
  }
  
  // Check if mailer exclusion is present
  if (htaccessContent.includes('!^/mailer/')) {
    console.log('✅ SPA routing correctly excludes /mailer/ directory');
  } else {
    console.warn('⚠️  SPA routing may not correctly exclude /mailer/ directory');
  }
  
  // Check for MIME type definitions
  if (htaccessContent.includes('AddType text/css .css') && 
      htaccessContent.includes('AddType application/javascript .js')) {
    console.log('✅ MIME type definitions present');
  } else {
    console.warn('⚠️  MIME type definitions may be missing');
  }
} else {
  console.warn('⚠️  .htaccess file is missing');
}

console.log('\nVerification complete!');
console.log('Next steps:');
console.log('1. Rebuild the project: npm run build');
console.log('2. Upload the contents of the out directory to cPanel');
console.log('3. Clear your browser cache and test the website');