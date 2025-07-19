#!/bin/bash

# Development server startup script
# This script starts Hugo development server with optimal settings

echo "🚀 Starting Agent Directory development server..."

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install Hugo Extended from https://gohugo.io/installation/"
    exit 1
fi

# Check Hugo version
HUGO_VERSION=$(hugo version | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+')
echo "📋 Using Hugo $HUGO_VERSION"

# Install npm dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Start development server
echo "🌐 Starting development server at http://localhost:1313"
echo "📝 The server will automatically reload when you make changes"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

hugo server \
    --bind 0.0.0.0 \
    --baseURL http://localhost:1313 \
    --buildDrafts \
    --buildFuture \
    --disableFastRender \
    --navigateToChanged \
    --templateMetrics \
    --templateMetricsHints \
    --watch
