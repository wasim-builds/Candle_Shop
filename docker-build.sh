#!/bin/bash

# Candle Shop - Docker Build and Test Script
# This script builds and tests the Docker image locally

echo "🚀 Candle Shop - Docker Build Test"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker first: https://docs.docker.com/get-docker/"
    exit 1
fi

echo -e "${GREEN}✅ Docker is installed${NC}"
echo ""

# Build Docker image
echo "📦 Building Docker image..."
echo "This may take 5-10 minutes on first build..."
echo ""

if docker build -t candle-shop:latest .; then
    echo ""
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Docker build failed${NC}"
    echo "Check the error messages above"
    exit 1
fi

# Show image size
echo "📊 Image Information:"
docker images candle-shop:latest
echo ""

# Ask if user wants to run the container
echo -e "${YELLOW}Do you want to test the container locally? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo "🏃 Starting container..."
    echo "Container will be available at: http://localhost:3000"
    echo "Press Ctrl+C to stop"
    echo ""
    
    # Check if .env.local exists
    if [ -f .env.local ]; then
        echo -e "${GREEN}✅ Found .env.local file${NC}"
        docker run -p 3000:3000 --env-file .env.local candle-shop:latest
    else
        echo -e "${YELLOW}⚠️  No .env.local file found${NC}"
        echo "Running without environment variables"
        echo "Some features may not work without database connection"
        docker run -p 3000:3000 candle-shop:latest
    fi
else
    echo ""
    echo -e "${GREEN}✅ Build complete!${NC}"
    echo ""
    echo "To run the container later:"
    echo "  docker run -p 3000:3000 --env-file .env.local candle-shop:latest"
    echo ""
    echo "To push to a registry:"
    echo "  docker tag candle-shop:latest your-registry/candle-shop:latest"
    echo "  docker push your-registry/candle-shop:latest"
fi

echo ""
echo "🎉 Done!"
