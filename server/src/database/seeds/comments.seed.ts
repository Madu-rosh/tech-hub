import mongoose from 'mongoose';
import { Comment, IComment } from '../models/comments.model'; // Ensure IComment is correctly imported
import { Post, IPost } from '../models/posts.model'; // Ensure IPost is correctly imported
import { User, IUser } from '../models/users.model'; // Ensure IUser is correctly imported

export const commentsSeed = async () => {

    // Fetch the 2nd and 3rd posts
    const posts = await Post.find().sort({ createdAt: 1 }).limit(3);
    if (posts.length < 3) {
        console.log("Insufficient posts found. Ensure at least 3 posts exist.");
        return;
    }
    const post2 = posts[1];
    const post3 = posts[2];

    // Assuming the posts have an 'author' field that stores the author's ID
    const author2 = await User.findById(post2.author);
    const author3 = await User.findById(post3.author);

    if (!author2 || !author3) {
        console.log("Author(s) for the posts not found.");
        return;
    }

    // Construct comments data with dynamically found post and author IDs
    const commentsData: Array<Pick<IComment, 'content' | 'post' | 'author'>> = [
        { content: "First comment on Post 2", post: post2._id, author: author2._id },
        { content: "First comment on Post 3", post: post3._id, author: author3._id },
        // Additional comments as required
    ];

    await Comment.deleteMany({});
    const insertedComments = await Comment.insertMany(commentsData);

    // Logic for adding replies
    // Assuming the first comment gets a reply from the second
    const replyData = {
        content: "Reply to first comment",
        post: post2._id,
        author: author2._id,
        replies: [insertedComments[0]._id] // Reference the ID of the first inserted comment
    };

    await Comment.findByIdAndUpdate(insertedComments[1]._id, { $push: { replies: replyData } });

    console.log("Comments and replies seeded successfully.");
};

commentsSeed().then(() => {
    console.log('Done seeding comments and replies.');
    mongoose.connection.close();
}).catch((error) => {
    console.error("Seeding comments and replies failed:", error);
    mongoose.connection.close();
});
