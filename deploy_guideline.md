# Deployment Guidelines for Earthib Redesign Project on cPanel (Static Export)

## Project Overview

The Earthib Redesign Project is a modern Next.js 15 application with the following key characteristics:
- Built with TypeScript
- Uses static export for deployment (no server-side operations or database)
- Includes shadcn/ui components with Tailwind CSS
- Optimized for static hosting environments like cPanel

## Static Export Configuration

The project has been configured for static export by adding the `output: 'export'` option in [next.config.ts](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/next.config.ts). This means:
- No server-side rendering or API routes
- All pages are pre-rendered as static HTML files
- Client-side JavaScript handles interactivity
- Perfect for static hosting environments like cPanel

## Files Added for Static Deployment

### .htaccess
A [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/.htaccess) file has been added to the [public](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/) directory with:
- SPA routing support (redirects all requests to index.html)
- HTTPS enforcement
- Security headers
- Gzip compression
- Static asset caching

### Sitemap
A comprehensive [sitemap.xml](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/sitemap.xml) has been added to the [public](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/) directory to help with SEO. The sitemap includes:
- Main homepage
- All anchor sections of the homepage (home, about, services, etc.)
- Additional pages that could be created (privacy policy, terms of service, etc.)

### LLMs.txt
An [llms.txt](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/llms.txt) file has been added to provide Large Language Models with structured information about the website. This file:
- Describes the purpose of Earthib.com as a premium domain for acquisition
- Provides structured information about the site's sections and services
- Includes contact information and legal pages
- Helps LLMs understand and interact with the site's content

## Deployment Process

### Automated Deployment Scripts

To simplify the deployment process, two scripts have been created:
1. [deploy.sh](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/deploy.sh) - For Unix/Linux/Mac systems
2. [deploy.bat](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/deploy.bat) - For Windows systems

These scripts automate the entire deployment process:
1. Build the project using Next.js
2. Create a clean [out](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out) directory
3. Copy all necessary static files to the [out](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/out) directory

### Manual Deployment Steps

If you prefer to deploy manually:

1. **Build the static site**:
   ```bash
   npm run build
   ```

2. **Create and populate the out directory**:
   ```bash
   # Remove existing out directory if it exists
   rm -rf out
   
   # Create new out directory
   mkdir out
   
   # Copy static files
   cp -r .next/server/app/. out/
   cp -r public/. out/
   ```

3. **Verify the contents of the out directory**:
   ```bash
   ls -la out/
   ```

## Deployment Steps for cPanel

1. **Run the deployment script**:
   - On Unix/Linux/Mac: `./deploy.sh`
   - On Windows: `deploy.bat`

2. **Upload files to cPanel**:
   - Use cPanel's File Manager to upload the contents of the `out` directory
   - Upload to your desired subdirectory or public_html for root domain
   - Make sure all files are uploaded including `.htaccess`, `sitemap.xml`, and `llms.txt`

3. **Configure your domain**:
   - If uploading to a subdirectory, make sure your domain points to the correct folder
   - The [.htaccess](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/.htaccess) file will handle routing automatically

## Customizing the Sitemap

Before deployment, update the [sitemap.xml](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/sitemap.xml) file with your actual domain:
1. Replace `https://earthib.com/` with your actual domain
2. Update the `<lastmod>` dates to current dates
3. Remove or add additional `<url>` entries based on your actual pages

## Customizing the LLMs.txt

Before deployment, update the [llms.txt](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/llms.txt) file:
1. Replace `https://earthib.com/` with your actual domain
2. Update contact information if needed
3. Add or remove sections based on your actual website structure

## Benefits of Static Export

1. **Fast Loading**: Pre-rendered HTML files load quickly
2. **Cheap Hosting**: Works with any static file hosting
3. **Better Security**: No server-side code to exploit
4. **Easy Scaling**: Simply serve files from a CDN
5. **Reliable**: Fewer points of failure compared to dynamic sites

## Limitations of Static Export

1. **No Server-Side Rendering**: Pages are not rendered on-demand
2. **No API Routes**: Cannot create serverless functions
3. **No Dynamic Content**: Content is fixed at build time
4. **No Real-Time Features**: WebSocket connections not possible

## Updating Your Site

To update your site after making changes:
1. Run the deployment script or follow the manual deployment steps
2. Upload the new contents of the `out` directory to cPanel
3. Update the [sitemap.xml](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/sitemap.xml) and [llms.txt](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/public/llms.txt) if you've added new pages

This approach is ideal for content-focused websites, portfolios, landing pages, and marketing sites where real-time features and dynamic content are not required.