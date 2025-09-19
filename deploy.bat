@echo off
REM Earthib Redesign Project Deployment Script for Windows

echo Building Earthib Redesign Project...
npm run build

echo Checking if out directory was created...
if exist "out" (
  echo Out directory exists. Contents:
  dir out\
) else (
  echo Out directory not found. This might be because Next.js 15 with 'output: export' creates it during build.
  echo Checking current directory structure:
  dir
)