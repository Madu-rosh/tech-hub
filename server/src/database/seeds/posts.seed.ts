import mongoose from 'mongoose';
import { Post, IPost } from '../models/posts.model'; // Ensure IPost is correctly imported
import { User, IUser } from '../models/users.model'; // Ensure IUser is correctly imported


const findUserIdByName = async (username: string): Promise<string | null> => {
    const user = await User.findOne({ username: username }).exec();
    return user?._id.toString() || null;
};

export const postsSeed = async () => {
    // Find user IDs by names
    const charlieBrownId = await findUserIdByName("charliebrown");
    const danaScullyId = await findUserIdByName("danascully");

    // Ensure both users are found
    if (!charlieBrownId || !danaScullyId) {
        console.error("User(s) not found. Ensure 'Charlie Brown' and 'Dana Scully' exist in the database.");
        return;
    }

    const postsData: Array<Pick<IPost, 'title' | 'content' | 'author' | 'approved'>> = [
        {
            title: "The Joy of Painting",
            content: "A deep dive into the soothing world of Bob Ross's painting series.",
            author: danaScullyId,
            approved: true,
        },
        {
            title: "Understanding TypeScript",
            content: "TypeScript brings static typing to JavaScript, enhancing developer experience and reducing runtime errors.",
            author: charlieBrownId,
            approved: true,
        },
        {
            title: "The Future of Web Development",
            content: "Exploring the trends and technologies that will shape the future of web development.",
            author: danaScullyId,
            approved: false,
        },
        {
            title: "Demystifying Cryptocurrencies",
            content: "A beginner's guide to understanding cryptocurrencies and how they work.",
            author: charlieBrownId,
            approved: true,
        },
        {
            title: "Sustainable Living",
            content: "Practical tips for reducing your environmental footprint and living a more sustainable life.",
            author: danaScullyId,
            approved: true,
        }
    ];

    await Post.deleteMany({});
    await Post.insertMany(postsData);

    console.log("Posts seeded successfully.");
};

postsSeed().then(() => {
    console.log('Done seeding posts.');
    mongoose.connection.close();
}).catch((error) => {
    console.error("Seeding posts failed:", error);
    mongoose.connection.close();
});
