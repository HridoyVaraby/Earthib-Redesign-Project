#!/bin/bash

# Earthib Redesign Project Deployment Script

echo "Building Earthib Redesign Project..."
npm run build

echo "Creating out directory..."
rm -rf out
mkdir out

echo "Copying static files..."
cp -r .next/server/app/. out/
cp -r public/. out/

echo "Deployment files are ready in the 'out' directory"
echo "Files included:"
ls -la out/