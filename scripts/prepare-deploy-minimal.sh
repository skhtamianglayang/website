#!/bin/bash

# ==========================================
# Script Deploy MINIMAL - Tanpa node_modules
# ==========================================
# Script ini membuat package minimal TANPA node_modules
# untuk menghemat space. npm install akan dilakukan di server.

set -e

echo "======================================"
echo "  SKH Website - MINIMAL Deploy Package"
echo "======================================"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PROJECT_DIR="$(pwd)"
DEPLOY_DIR="$PROJECT_DIR/deploy-package-minimal"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="skh-minimal-${TIMESTAMP}.zip"

echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found.${NC}"
    exit 1
fi

if [ ! -f "server.js" ]; then
    echo -e "${RED}Error: server.js not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Build application (jika belum)
if [ ! -d ".next" ]; then
    echo -e "${YELLOW}Step 2: Building application...${NC}"
    npm install
    npm run build
    echo -e "${GREEN}✓ Build completed${NC}"
else
    echo -e "${YELLOW}Step 2: Using existing build...${NC}"
    echo -e "${GREEN}✓ Build already exists${NC}"
fi
echo ""

# Create deployment directory
echo -e "${YELLOW}Step 3: Preparing minimal deployment package...${NC}"

if [ -d "$DEPLOY_DIR" ]; then
    rm -rf "$DEPLOY_DIR"
fi

mkdir -p "$DEPLOY_DIR"
echo -e "${GREEN}✓ Deployment directory created${NC}"
echo ""

# Copy necessary files (TANPA node_modules)
echo -e "${YELLOW}Step 4: Copying essential files only...${NC}"

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

# Configuration files
echo "Copying configuration files..."
cp server.js "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp package-lock.json "$DEPLOY_DIR/"
cp next.config.ts "$DEPLOY_DIR/"
cp tsconfig.json "$DEPLOY_DIR/"
cp .env.example "$DEPLOY_DIR/"

if [ -f "postcss.config.mjs" ]; then
    cp postcss.config.mjs "$DEPLOY_DIR/"
fi

if [ -f "eslint.config.mjs" ]; then
    cp eslint.config.mjs "$DEPLOY_DIR/"
fi

echo -e "${GREEN}✓ Files copied (node_modules EXCLUDED)${NC}"
echo ""

# Create .env template
echo -e "${YELLOW}Step 5: Creating .env template...${NC}"
cat > "$DEPLOY_DIR/.env" << 'EOF'
# PENTING: Update dengan kredensial database production Anda
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE_NAME"
NODE_ENV="production"
EOF

echo -e "${GREEN}✓ .env template created${NC}"
echo ""

# Create README
echo -e "${YELLOW}Step 6: Creating deployment instructions...${NC}"
cat > "$DEPLOY_DIR/README-DEPLOY.txt" << 'EOF'
=====================================
SKH WEBSITE - MINIMAL PACKAGE
=====================================

Package ini TIDAK termasuk node_modules untuk menghemat space.

LANGKAH DEPLOYMENT:
-------------------

1. Upload dan ekstrak semua files ini ke folder aplikasi di cPanel

2. PENTING: Edit file .env dengan kredensial database production

3. Di Terminal cPanel, jalankan:
   cd /path/to/aplikasi
   npm install --production
   
   (Ini akan install dependencies yang diperlukan, ~200-300MB)

4. Setup Node.js Application di cPanel:
   - Application startup file: server.js
   - Node.js version: 18.17+
   - Application mode: Production

5. Set Environment Variables di cPanel:
   - DATABASE_URL: (sesuai .env)
   - NODE_ENV: production

6. Run database migrations:
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed

7. Start aplikasi

ESTIMASI UKURAN:
- Package ZIP: ~50-100MB (tanpa node_modules)
- Setelah npm install: ~250-350MB total

=====================================
EOF

echo -e "${GREEN}✓ Instructions created${NC}"
echo ""

# Create ZIP
echo -e "${YELLOW}Step 7: Creating ZIP package...${NC}"

cd "$PROJECT_DIR"
if [ -f "$ZIP_NAME" ]; then
    rm "$ZIP_NAME"
fi

cd "$DEPLOY_DIR"
zip -r "../$ZIP_NAME" . -x "*.DS_Store" "*.git*"
cd "$PROJECT_DIR"

echo -e "${GREEN}✓ ZIP package created${NC}"
echo ""

# Summary
echo "======================================"
echo -e "${GREEN}  MINIMAL Package Ready! 🎉${NC}"
echo "======================================"
echo ""
echo "Package: $ZIP_NAME"
echo "Size: $(du -h "$ZIP_NAME" | cut -f1)"
echo ""
echo -e "${YELLOW}BENEFITS:${NC}"
echo "✓ Ukuran lebih kecil (tanpa node_modules)"
echo "✓ Upload lebih cepat"
echo "✓ Ekstrak tidak memenuhi disk"
echo ""
echo -e "${YELLOW}CATATAN PENTING:${NC}"
echo "⚠ Anda HARUS menjalankan 'npm install' di server"
echo "⚠ Pastikan server punya space ~250-300MB untuk node_modules"
echo ""
echo -e "${YELLOW}NEXT STEPS:${NC}"
echo "1. Upload $ZIP_NAME ke cPanel"
echo "2. Ekstrak di folder aplikasi"
echo "3. Jalankan: npm install --production"
echo "4. Setup Node.js App dan database"
echo "5. Start aplikasi"
echo ""
echo "======================================"

exit 0
