#!/bin/bash

# Agent Directory Build Script
# This script builds and validates the Hugo site

set -e

echo "🚀 Building Agent Directory..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the site
echo "🔨 Building Hugo site..."
hugo --minify

# Validate the build
echo "✅ Validating build..."
if [ -d "public" ]; then
    echo "✅ Build successful! Site generated in public/ directory"
    echo "📊 Build statistics:"
    echo "   - HTML files: $(find public -name "*.html" | wc -l)"
    echo "   - CSS files: $(find public -name "*.css" | wc -l)"
    echo "   - JS files: $(find public -name "*.js" | wc -l)"
    echo "   - JSON files: $(find public -name "*.json" | wc -l)"
    echo "   - Total size: $(du -sh public | cut -f1)"
else
    echo "❌ Build failed! Public directory not found"
    exit 1
fi

echo "🎉 Build complete! Ready for deployment."
