#!/usr/bin/env node

// Script to verify the fixes for Earthib website issues
const fs = require('fs');
const path = require('path');

console.log('Verifying Earthib Website Fixes...\n');

// Check if out directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  console.error('❌ Error: out directory not found');
  process.exit(1);
}

console.log('✅ out directory exists');

// Check .htaccess file
const htaccessPath = path.join(outDir, '.htaccess');
if (fs.existsSync(htaccessPath)) {
  const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
  console.log('✅ .htaccess file exists');
  
  // Check if mailer exclusion is present
  if (htaccessContent.includes('!^/mailer/')) {
    console.log('✅ SPA routing correctly excludes /mailer/ directory');
  } else {
    console.warn('⚠️  SPA routing may not correctly exclude /mailer/ directory');
  }
} else {
  console.warn('⚠️  .htaccess file is missing');
}

// Check mailer directory
const mailerDir = path.join(outDir, 'mailer');
if (fs.existsSync(mailerDir)) {
  console.log('✅ mailer directory exists');
} else {
  console.warn('⚠️  mailer directory is missing');
}

console.log('\nVerification complete!');
console.log('Next steps:');
console.log('1. Rebuild the project: npm run build');
console.log('2. Upload the contents of the out directory to cPanel');
console.log('3. Test the navigation and contact form');