# Deployment Guidelines for Earthib Redesign Project on cPanel

## Project Overview

The Earthib Redesign Project is a modern Next.js 15 application with the following key characteristics:
- Built with TypeScript
- Uses Prisma ORM with SQLite database
- Implements custom Socket.IO server in [server.ts](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/server.ts)
- Includes shadcn/ui components with Tailwind CSS
- Uses standalone custom server approach rather than default Next.js server

## cPanel Deployment Considerations

cPanel hosting has specific limitations that affect deployment:
1. Limited support for Node.js applications
2. No direct support for custom servers with Socket.IO
3. File system restrictions
4. Limited environment variable configuration

## Deployment Options

### Option 1: Standard Next.js Build (Recommended)

This approach removes the custom Socket.IO server and uses the standard Next.js build process:

1. **Modify the build process**:
   - Remove Socket.IO dependencies if not needed
   - Update [package.json](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/package.json) scripts to use standard Next.js commands:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start -p $PORT",
     "lint": "next lint"
   }
   ```

2. **Create a simplified server.js** for cPanel:
   ```javascript
   const { createServer } = require('http');
   const { parse } = require('url');
   const next = require('next');

   const dev = process.env.NODE_ENV !== 'production';
   const app = next({ dev });
   const handle = app.getRequestHandler();

   app.prepare().then(() => {
     const server = createServer((req, res) => {
       handle(req, res);
     });

     const port = process.env.PORT || 3000;
     server.listen(port, (err) => {
       if (err) throw err;
       console.log(`> Ready on http://localhost:${port}`);
     });
   });
   ```

3. **Configure cPanel**:
   - Set up Node.js application in cPanel
   - Application mode: Production
   - Application root: `/path/to/your/project`
   - Application startup file: `server.js`
   - Node.js version: 18.x or higher

### Option 2: Static Export (If Dynamic Features Not Required)

If you don't need server-side features like API routes or database access:

1. **Configure Next.js for static export** in [next.config.ts](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/next.config.ts):
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     // ... other config
   };

   export default nextConfig;
   ```

2. **Build the static site**:
   ```bash
   npm run build
   ```

3. **Upload the contents** of the `out` directory to your cPanel file manager

### Option 3: Docker Deployment (If cPanel Supports)

If your cPanel hosting supports Docker:

1. **Create a Dockerfile**:
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

## Database Configuration for cPanel

Since the project uses SQLite:

1. **Ensure the database file is in a writable directory**:
   - Modify [schema.prisma](file:///d:/Work/Node%20Projects/Earthib%20Redesign%20Project/prisma/schema.prisma) to use an absolute path:
   ```
   datasource db {
     provider = "sqlite"
     url      = "file:/home/username/project/db/database.db"
   }
   ```

2. **Create the database directory** in cPanel file manager

3. **Run Prisma migrations** after deployment:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

## Environment Variables

Set up environment variables in cPanel:
1. Go to "Setup Node.js App" in cPanel
2. Add environment variables:
   - `DATABASE_URL="file:/home/username/project/db/database.db"`
   - `NODE_ENV="production"`
   - `PORT="3000"`

## Deployment Steps

1. **Prepare the application**:
   - Remove or modify Socket.IO if not supported
   - Ensure all dependencies are compatible with cPanel's Node.js version
   - Test locally with `npm run build`

2. **Upload files to cPanel**:
   - Use File Manager or Git Version Control if available
   - Upload all files except `node_modules`, `.next`, and development logs

3. **Install dependencies**:
   ```bash
   npm ci --production
   ```

4. **Build the application**:
   ```bash
   npm run build
   ```

5. **Configure the Node.js application** in cPanel:
   - Set correct paths and startup file
   - Configure environment variables

6. **Start the application** and verify it's running

## Limitations and Workarounds

1. **Socket.IO Limitations**:
   - cPanel shared hosting typically blocks WebSocket connections
   - Consider removing real-time features or using alternative hosting

2. **Performance Considerations**:
   - cPanel shared hosting may not provide optimal Node.js performance
   - Consider upgrading to VPS hosting for better performance

3. **Database Limitations**:
   - SQLite works but isn't ideal for production
   - Consider migrating to MySQL if available in your cPanel hosting

## Alternative Hosting Recommendations

For better compatibility with this project's features, consider:
- VPS hosting with root access
- Cloud platforms like Vercel, Render, or Railway
- Dedicated Node.js hosting providers

These guidelines should help you successfully deploy the Earthib Redesign Project on cPanel hosting, though some features may need to be modified or removed due to cPanel's limitations.