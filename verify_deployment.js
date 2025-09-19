#!/usr/bin/env node

// Script to verify the deployment structure
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

console.log('Verifying deployment structure...\n');

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error('❌ Error: out directory not found');
  process.exit(1);
}

console.log('✅ out directory exists');

// Check required files
const requiredFiles = [
  'index.html',
  '.htaccess',
  'sitemap.xml',
  'llms.txt',
  'robots.txt'
];

requiredFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.warn(`⚠️  ${file} is missing`);
  }
});

// Check _next directory
const nextDir = path.join(outDir, '_next');
if (fs.existsSync(nextDir)) {
  console.log('✅ _next directory exists');
  
  // Check static directory
  const staticDir = path.join(nextDir, 'static');
  if (fs.existsSync(staticDir)) {
    console.log('✅ _next/static directory exists');
    
    // Check CSS directory
    const cssDir = path.join(staticDir, 'css');
    if (fs.existsSync(cssDir)) {
      const cssFiles = fs.readdirSync(cssDir);
      if (cssFiles.length > 0) {
        console.log(`✅ CSS files found (${cssFiles.length} files)`);
      } else {
        console.warn('⚠️  No CSS files found');
      }
    } else {
      console.warn('⚠️  _next/static/css directory is missing');
    }
    
    // Check chunks directory
    const chunksDir = path.join(staticDir, 'chunks');
    if (fs.existsSync(chunksDir)) {
      const chunkFiles = fs.readdirSync(chunksDir);
      if (chunkFiles.length > 0) {
        console.log(`✅ JavaScript chunk files found (${chunkFiles.length} files)`);
      } else {
        console.warn('⚠️  No JavaScript chunk files found');
      }
    } else {
      console.warn('⚠️  _next/static/chunks directory is missing');
    }
  } else {
    console.warn('⚠️  _next/static directory is missing');
  }
} else {
  console.error('❌ Error: _next directory is missing');
}

// Check mailer directory
const mailerDir = path.join(outDir, 'mailer');
if (fs.existsSync(mailerDir)) {
  console.log('✅ mailer directory exists');
  
  const mailerFiles = fs.readdirSync(mailerDir);
  if (mailerFiles.includes('send-email.php') && mailerFiles.includes('config.mail.php')) {
    console.log('✅ Required mailer files exist');
  } else {
    console.warn('⚠️  Some mailer files might be missing');
  }
} else {
  console.warn('⚠️  mailer directory is missing');
}

console.log('\nDeployment verification complete!');