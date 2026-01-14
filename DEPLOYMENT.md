# Candle Shop - Deployment Guide

## Quick Start Deployment

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- MongoDB Atlas account (free tier available)

### Step 1: MongoDB Atlas Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Create database user with password
4. Allow access from anywhere (0.0.0.0/0)
5. Get connection string

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import `wasim-builds/Candle_Shop` from GitHub
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Will be your Vercel URL (update after first deploy)

### Step 3: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Get your deployment URL
4. Update `NEXTAUTH_URL` environment variable
5. Redeploy

## Environment Variables

### Required
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/candle-shop?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
```

### Optional
```
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key
SENDGRID_API_KEY=your-key
EMAIL_FROM=noreply@yourdomain.com
```

## Post-Deployment
1. Visit your deployed URL
2. Test homepage, shop, product pages
3. Test admin dashboard at `/admin`
4. Add products via admin panel
5. Test cart and checkout flow

## Troubleshooting
- Check Vercel logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set
- Clear browser cache if issues persist

## Support
For detailed deployment guide, see: deployment_plan.md
