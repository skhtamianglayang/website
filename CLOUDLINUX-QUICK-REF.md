# CloudLinux NodeJS Selector - Quick Reference

## ⚠️ CRITICAL RULE
**NEVER deploy `node_modules` folder to the server!**

CloudLinux NodeJS Selector creates a **symlink** named `node_modules` that points to a virtual environment. Your application must not contain an actual `node_modules` folder.

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Create deployment package (excludes node_modules)
npm run deploy:package
```

---

## Deployment to cPanel

### 1. Create Deployment Package
```bash
npm run deploy:package
# Creates: deploy_YYYYMMDD_HHMMSS.tar.gz (without node_modules)
```

### 2. Upload to cPanel
- Upload the `.tar.gz` file via File Manager or FTP
- Extract to your application directory

### 3. Configure NodeJS App in cPanel
1. Go to **Setup Node.js App**
2. Click **Create Application**
3. Set:
   - **Node.js version**: (your version)
   - **Application root**: `/home/username/your-app-path`
   - **Application URL**: your domain
   - **Application startup file**: `server.js`
4. Add environment variables:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `NODE_ENV=production`

### 4. Install Dependencies in Virtual Environment
```bash
# Enter virtual environment (command provided by cPanel)
source /home/username/nodevenv/your-app-path/Node.js-X.X/bin/activate

# Install dependencies (symlink created automatically)
npm install

# Build application
npm run build

# Exit virtual environment
deactivate
```

### 5. Restart Application
Click **Restart** button in cPanel NodeJS Selector interface

---

## Verify Symlink

```bash
# Check that node_modules is a symlink
ls -la | grep node_modules

# Should show:
# lrwxrwxrwx ... node_modules -> /home/user/nodevenv/.../lib/node_modules
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't find modules | Remove any `node_modules` folder, reinstall via virtual env |
| Application won't start | Check environment variables, restart app |
| Symlink broken | Delete `node_modules`, run `npm install` in virtual env |
| Build fails | Ensure all dependencies in `package.json`, check Node version |

---

## File Checklist

- ✅ `.gitignore` includes `/node_modules`
- ✅ `package.json` has all dependencies
- ✅ `package-lock.json` committed
- ✅ `.env.example` shows required variables
- ✅ No `node_modules` in deployment package

---

## Helpful Commands

```bash
# Check Node version in virtual environment
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Clean install
rm -rf node_modules package-lock.json
npm install

# View application logs (in cPanel Terminal)
tail -f /home/username/logs/your-app-name.log
```

---

## Documentation

- **Full Guide**: [DEPLOY-CLOUDLINUX-NODEJS.md](./DEPLOY-CLOUDLINUX-NODEJS.md)
- **Project Structure**: [STRUKTUR-PROYEK.txt](./STRUKTUR-PROYEK.txt)
- **README**: [README.md](./README.md)

---

## Emergency Recovery

If deployment breaks:

1. **Backup current state**
2. **Remove application** from NodeJS Selector
3. **Delete `node_modules`** (if it exists as a folder)
4. **Re-create** NodeJS application in cPanel
5. **Reinstall** dependencies in virtual environment
6. **Rebuild** and restart

---

*Last Updated: December 2025*
