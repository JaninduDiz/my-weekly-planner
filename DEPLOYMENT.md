# Deployment Guide for Weekly Planner

## 🚀 Deploy to Vercel (Recommended)

### 1. Prepare Your Repository
- Push your code to GitHub
- Make sure all files are committed

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables
In your Vercel project settings, add:
```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=production
```

### 4. Deploy
- Vercel will automatically build and deploy on every push
- Your app will be available at `https://your-project.vercel.app`

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to Vercel environment variables

### Option 2: Local MongoDB
- Install MongoDB locally
- Use connection string: `mongodb://localhost:27017/weekly-goals`

## 📱 PWA Installation

### On iPhone:
1. Open your app in Safari
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"

### On Android:
1. Open your app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen"
4. Follow the prompts

## 🔧 Environment Variables

Create a `.env.local` file locally for development:
```
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

## �� Important Notes

- **Never commit `.env.local`** to your repository
- **Use environment variables** in Vercel for production
- **Test locally** before deploying
- **Check build logs** if deployment fails

## 📊 Build Status

✅ **Current Status**: App builds successfully
✅ **TypeScript**: All type errors resolved
✅ **MongoDB**: Connection utility ready
✅ **PWA**: Basic setup complete
✅ **Components**: All UI components built
✅ **API Routes**: CRUD operations ready

## 🎯 Next Steps

1. Set up MongoDB database
2. Deploy to Vercel
3. Test PWA installation
4. Add real PWA icons (replace placeholder .png files)
5. Test all functionality in production
