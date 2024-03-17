import mongoose from 'mongoose';
import usersSeed from './seeds/users.seed';
import postsSeed from './seeds/posts.seed';
import commentsSeed from './seeds/comments.seed';


/*mongoose.connect(url)
  .then(() => {
    console.log('MongoDB connected');
    usersSeed();
  })
  .then(() => {
    console.log('Users seeded successfully.');
    postsSeed();
  })
  .then(() => {
    console.log('Posts seeded successfully.');
    commentsSeed();
  })
  .then(() => {
    console.log('Comments seeded successfully.');
    console.log('All seeding operations complete.');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('An error occurred during the seeding process:', error);
    mongoose.connection.close();
  });*/
const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");

    await usersSeed();
    console.log("Seeding Users complete");

    await postsSeed();
    console.log("Seeding Posts complete");

    await commentsSeed();
    console.log("Seeding Comments complete");

    console.log('All seeding operations complete.');
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
}

export default connectDB;
