This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on cPanel with CloudLinux NodeJS Selector

This application is configured for deployment on cPanel with CloudLinux NodeJS Selector.

### ⚠️ Important: Node Modules Handling

**CloudLinux NodeJS Selector uses a virtual environment approach:**
- `node_modules` MUST be a symlink (created automatically by CloudLinux)
- Do NOT deploy an actual `node_modules` folder to the server
- Dependencies are installed via CloudLinux's virtual environment

### Deployment Steps

See [DEPLOY-CLOUDLINUX-NODEJS.md](./DEPLOY-CLOUDLINUX-NODEJS.md) for complete deployment instructions.

Quick overview:
1. Upload application files (without `node_modules`)
2. Configure Node.js app in cPanel NodeJS Selector
3. Enter virtual environment: `source /home/username/nodevenv/.../bin/activate`
4. Install dependencies: `npm install`
5. Build application: `npm run build`
6. Restart via cPanel interface

### Environment Variables

Required environment variables (set in cPanel NodeJS Selector):
- `DATABASE_URL` - PostgreSQL/MySQL connection string
- `SESSION_SECRET` - Secret key for sessions
- `NODE_ENV=production`

## Deploy on Vercel

**Recommended for easy deployment!**

This application is ready to deploy on Vercel with just a few clicks.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/J4T3L/this_idonknow)

### Manual Deployment

See [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) for complete step-by-step instructions including:
- Environment variable setup
- Database configuration
- Prisma migration
- Troubleshooting common issues

**What you'll need:**
1. Vercel account (free)
2. PostgreSQL database (Vercel Postgres, Supabase, etc.)
3. Environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Secret key for sessions
   - `NODE_ENV=production`

**Note**: The repository is already configured with `postinstall` script to automatically generate Prisma Client during deployment.

