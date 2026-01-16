# 🐳 Docker Quick Reference

## Quick Commands

### Build Image
```bash
docker build -t candle-shop .
```

### Run Container
```bash
# With environment variables
docker run -p 3000:3000 --env-file .env.local candle-shop

# Without environment variables (limited functionality)
docker run -p 3000:3000 candle-shop
```

### Stop Container
```bash
# Find container ID
docker ps

# Stop container
docker stop <container-id>
```

### View Logs
```bash
docker logs <container-id>
```

### Remove Image
```bash
docker rmi candle-shop
```

## Helper Script

We've created a helper script for easy building and testing:

```bash
# Make it executable (first time only)
chmod +x docker-build.sh

# Run the script
./docker-build.sh
```

The script will:
1. Check if Docker is installed
2. Build the Docker image
3. Show image information
4. Optionally run the container for testing

## Environment Variables for Local Testing

Create a `.env.local` file for local Docker testing:

```bash
# .env.local
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=production
```

> [!WARNING]
> Never commit `.env.local` to Git! It's already in `.gitignore`.

## Troubleshooting

### Build is slow
- First build takes longer (5-10 minutes)
- Subsequent builds use cache and are faster
- Use `docker build --no-cache` to rebuild from scratch

### Port already in use
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process or use different port
docker run -p 3001:3000 candle-shop
```

### Out of disk space
```bash
# Clean up unused Docker resources
docker system prune -a
```
