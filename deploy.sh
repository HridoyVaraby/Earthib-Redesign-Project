#!/bin/bash

# Earthib Redesign Project Deployment Script

echo "Building Earthib Redesign Project..."
npm run build

echo "Checking if out directory was created..."
if [ -d "out" ]; then
  echo "Out directory exists. Contents:"
  ls -la out/
else
  echo "Out directory not found. This might be because Next.js 15 with 'output: export' creates it during build."
  echo "Checking current directory structure:"
  ls -la
fi