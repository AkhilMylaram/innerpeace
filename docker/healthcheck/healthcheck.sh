#!/bin/sh

echo "Starting health checks..."

# Check nginx health
echo "Checking nginx health..."
wget --no-verbose --tries=1 --spider http://innerpeace-nginx-service/health || exit 1

# Check Next.js app health
echo "Checking Next.js app health..."
wget --no-verbose --tries=1 --spider http://innerpeace-service:3000 || exit 1

echo "All health checks passed!"
