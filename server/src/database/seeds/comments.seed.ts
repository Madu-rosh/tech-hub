import mongoose from 'mongoose';
import { Comment } from '../models/comments.model'; // Adjust the import as necessary
import { Post } from '../models/posts.model'; // Adjust the import as necessary
import { User } from '../models/users.model'; // Adjust the import as necessary

export const commentsSeed = async () => {
    // Fetch the 2nd and 3rd posts
    const posts = await Post.find().sort({ createdAt: 1 }).limit(3);
    if (posts.length < 3) {
        console.log("Insufficient posts found. Ensure at least 3 posts exist.");
        return;
    }
    const post2 = posts[1];
    const post3 = posts[2];

    // Construct comments data with dynamically found post and author IDs
    const commentsData = [
        { content: "First comment on Post 2", post: post2._id, author: post2.author },
        { content: "First comment on Post 3", post: post3._id, author: post3.author },
        // Additional comments as required
    ];

    await Comment.deleteMany({});
    await Comment.insertMany(commentsData);

    // Insert a reply to the first comment
    // Assuming you want to add a reply to the first comment on Post 2 by the second comment's author
    const firstComment = await Comment.findOne({ post: post2._id }).sort({ createdAt: 1 });
    if (!firstComment) {
        console.log("First comment on Post 2 not found.");
        return;
    }

    const replyComment = new Comment({
        content: "Reply to first comment",
        post: post2._id,
        author: post3.author, // Assuming you want the author of the second comment to reply
        // Don't include replies here as this is the top-level field for replies to this comment
    });
    await replyComment.save();

    // Update the first comment to include this new reply's _id in its replies array
    await Comment.findByIdAndUpdate(firstComment._id, { $push: { replies: replyComment._id } });

    console.log("Comments and replies seeded successfully.");
};

// Uncomment below to run the seeding script
// commentsSeed().then(() => {
//     console.log('Done seeding comments and replies.');
//     mongoose.disconnect();
// }).catch((error) => {
//     console.error("Seeding comments and replies failed:", error);
//     mongoose.disconnect();
// });

export default commentsSeed;
