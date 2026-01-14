import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('⚠️  MongoDB connection failed:', error.message);
    console.log('⚠️  Running without database - sessions will not persist');
    console.log('💡 To fix: Install MongoDB or use MongoDB Atlas (see START_HERE.md)');
    // Don't exit - allow app to run without DB for testing
  }
};
