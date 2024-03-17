import mongoose from 'mongoose';
import { usersSeed } from './seeds/users.seed';
import { postsSeed } from './seeds/posts.seed';
import { commentsSeed } from './seeds/comments.seed';

const connectDB = (url: string) => {
  mongoose.connect(url)
    .then(() => {
      console.log('MongoDB connected');
      return usersSeed();
    })
    .then(() => {
      console.log('Users seeded successfully.');
      return postsSeed();
    })
    .then(() => {
      console.log('Posts seeded successfully.');
      return commentsSeed();
    })
    .then(() => {
      console.log('Comments seeded successfully.');
      console.log('All seeding operations complete.');
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('An error occurred during the seeding process:', error);
      mongoose.connection.close();
    });
};

export default connectDB;
