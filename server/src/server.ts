import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./database/connect";

import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';

// const getSpecificRoute = require('./routes/getmessagebyid.route');

dotenv.config();
// Connect to MongoDB
connectDB(process.env.MONGODB_URL!);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
