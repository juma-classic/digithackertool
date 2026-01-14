#!/bin/bash

echo "🚀 Starting Digit Hacker Tool..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    mongod --fork --logpath /tmp/mongodb.log
fi

# Backend setup
echo "📦 Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your configuration!"
    exit 1
fi

# Start backend in background
echo "🔧 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit frontend/.env with your configuration!"
    kill $BACKEND_PID
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend server..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
