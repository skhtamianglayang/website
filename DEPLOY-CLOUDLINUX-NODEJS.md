# CloudLinux NodeJS Selector Deployment Guide

## Important: Node Modules Handling

CloudLinux NodeJS Selector uses a **virtual environment** approach where:
- Node modules are stored in a separate folder managed by CloudLinux
- A symlink named `node_modules` points to this virtual environment
- **Your application MUST NOT contain an actual `node_modules` folder/file in the root**

## Pre-Deployment Checklist

### 1. Ensure `.gitignore` Excludes `node_modules`
Your `.gitignore` should contain:
```
/node_modules
```
This ensures `node_modules` is never committed to git.

### 2. Clean Deployment Package
When deploying to cPanel, ensure your deployment package does NOT include `node_modules`:

```bash
# Create deployment package without node_modules
zip -r deploy.zip . -x "node_modules/*" -x ".git/*" -x ".next/*"
```

Or using tar:
```bash
# Create tar archive without node_modules
tar --exclude='node_modules' --exclude='.git' --exclude='.next' -czf deploy.tar.gz .
```

## CloudLinux NodeJS Selector Setup

### 1. Upload Application
Upload your application files to cPanel (without `node_modules`).

### 2. Configure NodeJS Application in cPanel
1. Go to **Setup Node.js App** in cPanel
2. Click **Create Application**
3. Configure:
   - **Node.js version**: Select your required version
   - **Application mode**: Production
   - **Application root**: Path to your application
   - **Application URL**: Your domain/subdomain
   - **Application startup file**: `server.js` (or your entry point)

### 3. Install Dependencies
After creating the application, CloudLinux will provide a command to enter the virtual environment:
```bash
source /home/username/nodevenv/your-app-path/Node.js-version/bin/activate
```

Then install dependencies:
```bash
npm install
```

CloudLinux will:
- Install packages in the virtual environment folder
- Automatically create a `node_modules` symlink in your application root
- Point this symlink to the virtual environment's node_modules

### 4. Build Application (if needed)
If your app requires a build step:
```bash
npm run build
```

### 5. Restart Application
Use the **Restart** button in the NodeJS Selector interface.

## Verification

After deployment, verify the setup:

```bash
# Check that node_modules is a symlink
ls -la /path/to/your/app | grep node_modules

# Expected output should show something like:
# lrwxrwxrwx  1 user user   XX Dec 20 22:00 node_modules -> /home/user/nodevenv/.../lib/node_modules
```

## Environment Variables

Set your environment variables in the cPanel NodeJS Selector interface:
- `DATABASE_URL`
- `SESSION_SECRET`
- `NODE_ENV=production`
- etc.

## Troubleshooting

### Issue: Application can't find modules
**Cause**: Symlink not created properly
**Solution**: 
1. Remove any existing `node_modules` folder/file in app root
2. Run `npm install` from the virtual environment
3. Restart the application

### Issue: "ENOENT: no such file or directory, scandir 'node_modules'"
**Cause**: Application deployed with actual `node_modules` folder
**Solution**:
1. Remove the `node_modules` folder from your application
2. Reinstall via CloudLinux virtual environment

## Best Practices

1. **Never commit `node_modules`** - Always keep it in `.gitignore`
2. **Deploy from git** - Use git to deploy, which automatically excludes `node_modules`
3. **Test locally** - Ensure your app works with symlinked `node_modules`
4. **Document dependencies** - Keep `package.json` up to date
5. **Lock versions** - Commit `package-lock.json` for consistent installs

## Deployment Workflow

```bash
# 1. On local machine - prepare deployment
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. On cPanel server - pull latest changes
cd /path/to/your/app
git pull origin main

# 3. Enter virtual environment
source /home/username/nodevenv/your-app-path/Node.js-version/bin/activate

# 4. Install/update dependencies
npm install

# 5. Build application (if needed)
npm run build

# 6. Restart application via cPanel NodeJS Selector interface
```

## Additional Notes

- The symlink approach allows CloudLinux to manage multiple Node.js versions
- Each application can have its own isolated set of dependencies
- This prevents conflicts between different applications on the same server
- System resources are optimized by centralizing module storage
