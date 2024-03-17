import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./database/connect";

import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import mongoose from 'mongoose';

// const getSpecificRoute = require('./routes/getmessagebyid.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const server = app.listen(PORT, () => {
  // Connect to MongoDB
  connectDB(process.env.MONGODB_URL!);
  console.log(`Server is running on http://localhost:${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Closing server and MongoDB connection...');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close().then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    }).catch((error) => {
      console.error('Error closing MongoDB connection:', error);
      process.exit(1); // Exit with error
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
