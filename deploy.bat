@echo off
REM Earthib Redesign Project Deployment Script for Windows

echo Building Earthib Redesign Project...
npm run build

echo Creating out directory...
rmdir /s /q out
mkdir out

echo Copying static files...
xcopy .next\server\app\* out\ /E /I /H
xcopy public\* out\ /E /I /H

echo Deployment files are ready in the 'out' directory
echo Files included:
dir out\