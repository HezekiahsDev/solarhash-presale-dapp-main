#!/bin/bash

APP_NAME="ico_v1"
APP_DIR="/home/solarhash/deploy/ico_v1/solarhash-presale-dapp-main"

echo "🚀 Starting deployment for $APP_NAME..."

# Navigate to the app directory
cd $APP_DIR || { echo "❌ Failed to cd into $APP_DIR"; exit 1; }

# Step 1: Stop and delete any existing PM2 service
echo "🛑 Stopping and deleting existing PM2 process (if any)..."
pm2 stop $APP_NAME >/dev/null 2>&1
pm2 delete $APP_NAME >/dev/null 2>&1

# Step 2: Pull latest code
echo "📥 Pulling latest code from git..."
git pull || { echo "❌ Git pull failed"; exit 1; }

# Step 3: Remove old build files
echo "🧹 Cleaning previous Next.js build..."
rm -rf .next/

# Step 4: Install dependencies
echo "📦 Installing dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

# Step 5: Build the Next.js app
echo "🏗️ Building the app..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Step 6: Start with PM2
echo "🔁 Starting the app with PM2..."
pm2 start npm --name $APP_NAME -- start || { echo "❌ PM2 start failed"; exit 1; }

# Set PM2 startup and save
pm2 startup -u $(whoami) --hp $HOME
pm2 save

# Step 7: Health check
echo "🔍 Checking app status..."
pm2 show $APP_NAME

# Step 8: Done
echo "✅ Deployment complete! App '$APP_NAME' is live 🚀