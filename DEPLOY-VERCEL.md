# Deploy to Vercel

This guide will help you deploy your Next.js application to Vercel.

## Prerequisites

- GitHub account with your repository
- Vercel account (sign up at [vercel.com](https://vercel.com))
- PostgreSQL database (Vercel Postgres, Supabase, or other)

## Step 1: Prepare Your Project

### ✅ Already Configured

Your project is already configured with:
- `postinstall` script for Prisma Client generation
- Proper build scripts
- Environment variables template (`.env.example`)

### Database Setup

You'll need a PostgreSQL database. Options:

1. **Vercel Postgres** (recommended for Vercel deployments)
2. **Supabase** (free tier available)
3. **Railway** (free tier available)
4. **Your own PostgreSQL server**

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"

2. **Import GitHub Repository**
   - Select "Import Git Repository"
   - Choose `J4T3L/this_idonknow`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   SESSION_SECRET=your-super-secret-key-here
   NODE_ENV=production
   ```

   > **Important**: Replace `DATABASE_URL` with your actual PostgreSQL connection string

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? (press enter for default)
# - Directory? ./ (press enter)
# - Override settings? No

# Add environment variables
vercel env add DATABASE_URL
vercel env add SESSION_SECRET
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

## Step 3: Database Migration

After deployment, you need to run migrations:

### Option 1: Via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Pull environment variables
vercel env pull .env.production

# Run migration
npx dotenv -e .env.production -- npx prisma migrate deploy

# Optional: Seed database
npx dotenv -e .env.production -- npx prisma db seed
```

### Option 2: Manual Migration

1. Get your production database URL from Vercel dashboard
2. Run locally:
   ```bash
   DATABASE_URL="your-production-db-url" npx prisma migrate deploy
   DATABASE_URL="your-production-db-url" npx prisma db seed
   ```

## Step 4: Verify Deployment

1. **Check Build Logs**
   - Ensure no errors in Vercel dashboard
   - Verify Prisma Client was generated (look for "prisma generate" in logs)

2. **Test Your Application**
   - Visit your Vercel URL (e.g., `your-project.vercel.app`)
   - Test login functionality
   - Verify database connectivity

3. **Check Environment Variables**
   - Go to Project Settings → Environment Variables
   - Ensure all variables are set correctly

## Environment Variables Reference

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | Secret key for sessions | `your-random-secret-key-min-32-chars` |
| `NODE_ENV` | Environment mode | `production` |

## Common Issues & Solutions

### Issue 1: Prisma Client Generation Error
```
Error: Prisma Client is not generated
```

**Solution**: Already fixed! The `postinstall` script automatically runs `prisma generate`.

### Issue 2: Database Connection Error
```
Error: Can't reach database server
```

**Solutions**:
1. Check `DATABASE_URL` format
2. Ensure database allows connections from Vercel IPs
3. For Vercel Postgres, use the connection string from Vercel dashboard
4. Check database firewall settings

### Issue 3: Build Timeout
```
Error: Command "next build" timed out
```

**Solutions**:
1. Optimize images (use Next.js Image component)
2. Reduce bundle size
3. Check for infinite loops in build process

### Issue 4: Environment Variables Not Working
```
Error: Cannot read property 'DATABASE_URL' of undefined
```

**Solutions**:
1. Add all env vars in Vercel dashboard
2. Redeploy after adding env vars
3. Check variable names (case-sensitive)

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning

## Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically builds and deploys
```

## Monitoring

- **Deployment Logs**: Vercel Dashboard → Deployments → View Function Logs
- **Analytics**: Vercel Dashboard → Analytics (available on Pro plan)
- **Error Tracking**: Consider integrating Sentry or similar

## Cost Considerations

**Vercel Free Tier includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Serverless Functions execution

**Upgrade to Pro if you need:**
- More bandwidth
- Team collaboration
- Advanced analytics
- Commercial usage

## Recommended: Vercel Postgres Setup

If using Vercel Postgres (easiest integration):

1. Go to your project in Vercel
2. Click "Storage" tab
3. Create "Postgres" database
4. Copy connection string
5. Add as `DATABASE_URL` environment variable
6. Redeploy

Connection string will be like:
```
postgres://default:xxx@xxx-pooler.aws-region.postgres.vercel-storage.com:5432/verceldb
```

## Next Steps

After successful deployment:

1. ✅ Test all features
2. ✅ Run database migrations
3. ✅ Seed initial data
4. ✅ Configure custom domain (optional)
5. ✅ Set up monitoring
6. ✅ Enable preview deployments for PRs

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Prisma Vercel Guide**: [pris.ly/d/vercel-build](https://pris.ly/d/vercel-build)

---

**Repository**: https://github.com/J4T3L/this_idonknow

**Last Updated**: December 2025
