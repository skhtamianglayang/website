#!/bin/bash

# Deployment Package Creator for CloudLinux NodeJS Selector
# This script creates a clean deployment package WITHOUT node_modules

set -e

echo "🚀 Creating CloudLinux deployment package..."

# Get timestamp for unique filename
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="deploy_${TIMESTAMP}.tar.gz"

# Files and directories to exclude
EXCLUDES=(
    "node_modules"
    ".git"
    ".next"
    "coverage"
    "*.log"
    ".DS_Store"
    "*.tar.gz"
    "*.zip"
    "deploy-package"
    ".env.local"
    ".env.development"
)

# Build exclude arguments for tar
EXCLUDE_ARGS=""
for item in "${EXCLUDES[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude=$item"
done

# Create the package
echo "📦 Packaging files (excluding node_modules and development files)..."
tar $EXCLUDE_ARGS -czf "$PACKAGE_NAME" .

# Get package size
PACKAGE_SIZE=$(du -h "$PACKAGE_NAME" | cut -f1)

echo "✅ Deployment package created: $PACKAGE_NAME"
echo "📊 Package size: $PACKAGE_SIZE"
echo ""
echo "⚠️  IMPORTANT REMINDERS:"
echo "   • node_modules is NOT included (CloudLinux will create a symlink)"
echo "   • After uploading to cPanel:"
echo "     1. Extract the package"
echo "     2. Configure NodeJS app in cPanel"
echo "     3. Enter virtual environment"
echo "     4. Run: npm install"
echo "     5. Run: npm run build"
echo "     6. Restart the application"
echo ""
echo "📖 See DEPLOY-CLOUDLINUX-NODEJS.md for detailed instructions"
