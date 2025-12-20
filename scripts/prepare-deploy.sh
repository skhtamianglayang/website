#!/bin/bash

# ==========================================
# Script Persiapan Deploy SKH Website
# ==========================================
# Script ini akan mempersiapkan package deployment
# untuk upload ke cPanel hosting

set -e  # Exit on error

echo "======================================"
echo "  SKH Website - Deployment Preparation"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="$(pwd)"
DEPLOY_DIR="$PROJECT_DIR/deploy-package"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="skh-website-${TIMESTAMP}.zip"

echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from project root.${NC}"
    exit 1
fi

if [ ! -f "server.js" ]; then
    echo -e "${RED}Error: server.js not found. Please ensure deployment files are created.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Build application
echo -e "${YELLOW}Step 3: Building application for production...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Step 4: Create deployment directory
echo -e "${YELLOW}Step 4: Preparing deployment package...${NC}"

# Remove old deployment directory if exists
if [ -d "$DEPLOY_DIR" ]; then
    echo "Removing old deployment directory..."
    rm -rf "$DEPLOY_DIR"
fi

# Create fresh deployment directory
mkdir -p "$DEPLOY_DIR"
echo -e "${GREEN}✓ Deployment directory created${NC}"
echo ""

# Step 5: Copy necessary files
echo -e "${YELLOW}Step 5: Copying files...${NC}"

# Copy directories
echo "Copying .next/..."
cp -r .next "$DEPLOY_DIR/"

echo "Copying app/..."
cp -r app "$DEPLOY_DIR/"

echo "Copying lib/..."
cp -r lib "$DEPLOY_DIR/"

echo "Copying prisma/..."
cp -r prisma "$DEPLOY_DIR/"

echo "Copying public/..."
cp -r public "$DEPLOY_DIR/"

# Copy node_modules (optional - comment out if too large)
# Uncomment the line below if you want to include node_modules
# echo "Copying node_modules/..."
# cp -r node_modules "$DEPLOY_DIR/"

# Copy configuration files
echo "Copying configuration files..."
cp server.js "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp package-lock.json "$DEPLOY_DIR/"
cp next.config.ts "$DEPLOY_DIR/"
cp tsconfig.json "$DEPLOY_DIR/"
cp .env.example "$DEPLOY_DIR/"

# Copy other necessary files
if [ -f "postcss.config.mjs" ]; then
    cp postcss.config.mjs "$DEPLOY_DIR/"
fi

if [ -f "eslint.config.mjs" ]; then
    cp eslint.config.mjs "$DEPLOY_DIR/"
fi

echo -e "${GREEN}✓ Files copied successfully${NC}"
echo ""

# Step 6: Create .env template in deployment package
echo -e "${YELLOW}Step 6: Creating production .env template...${NC}"
cat > "$DEPLOY_DIR/.env" << 'EOF'
# IMPORTANT: Update these values with your production database credentials
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE_NAME"
NODE_ENV="production"
EOF

echo -e "${GREEN}✓ .env template created${NC}"
echo ""

# Step 7: Create README for deployment package
echo -e "${YELLOW}Step 7: Creating deployment instructions...${NC}"
cat > "$DEPLOY_DIR/README-DEPLOY.txt" << 'EOF'
=====================================
SKH WEBSITE - DEPLOYMENT PACKAGE
=====================================

Files ini siap untuk diupload ke cPanel hosting.

LANGKAH DEPLOYMENT:
-------------------

1. PENTING: Edit file .env dengan kredensial database production Anda

2. Upload semua files ini ke folder aplikasi di cPanel (via File Manager atau FTP)

3. Jika tidak meng-include node_modules, jalankan di Terminal cPanel:
   cd /path/to/aplikasi
   npm install

4. Setup Node.js Application di cPanel:
   - Application startup file: server.js
   - Node.js version: 18.17+
   - Application mode: Production

5. Set Environment Variables di cPanel Node.js App:
   - DATABASE_URL: (sesuai .env file)
   - NODE_ENV: production

6. Jalankan migrations:
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed

7. Start aplikasi di cPanel Node.js App Manager

Untuk detail lengkap, lihat file DEPLOYMENT.md di project repository.

=====================================
EOF

echo -e "${GREEN}✓ Deployment instructions created${NC}"
echo ""

# Step 8: Create ZIP package
echo -e "${YELLOW}Step 8: Creating ZIP package...${NC}"

cd "$PROJECT_DIR"
if [ -f "$ZIP_NAME" ]; then
    rm "$ZIP_NAME"
fi

# Create ZIP from deployment directory
cd "$DEPLOY_DIR"
zip -r "../$ZIP_NAME" . -x "*.DS_Store" "*.git*"
cd "$PROJECT_DIR"

echo -e "${GREEN}✓ ZIP package created: $ZIP_NAME${NC}"
echo ""

# Step 9: Show summary
echo "======================================"
echo -e "${GREEN}  Deployment Package Ready! 🎉${NC}"
echo "======================================"
echo ""
echo "Package location: $PROJECT_DIR/$ZIP_NAME"
echo "Package size: $(du -h "$ZIP_NAME" | cut -f1)"
echo ""
echo "Deployment directory: $DEPLOY_DIR"
echo ""
echo -e "${YELLOW}NEXT STEPS:${NC}"
echo "1. Review the contents in: $DEPLOY_DIR"
echo "2. Edit $DEPLOY_DIR/.env with production database credentials"
echo "3. Upload $ZIP_NAME to cPanel"
echo "4. Follow instructions in DEPLOYMENT.md"
echo ""
echo -e "${GREEN}Note:${NC} You can delete the deploy-package/ directory after uploading ZIP"
echo ""
echo "======================================"

# Optional: Show what's NOT included
echo -e "${YELLOW}Files NOT included in package:${NC}"
echo "  - node_modules/ (install via npm on server)"
echo "  - .git/"
echo "  - *.md documentation files"
echo "  - Development configuration files"
echo ""
echo "If you need to include node_modules, uncomment the relevant"
echo "line in this script and run again (will increase package size)."
echo ""

exit 0
