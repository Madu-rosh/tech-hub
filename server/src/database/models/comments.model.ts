import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './users.model'; // Import IUser for author reference
import { IPost } from './posts.model'; // Import IPost for post reference

// TypeScript Interface for Comment
export interface IComment extends Document {
    content: string;
    post: IPost['_id']; // Reference to the post this comment belongs to
    author: IUser['_id']; // Reference to the user who authored the comment
    createdAt?: Date; // Optional: managed by timestamps in schema
    replies: Array<IComment['_id']>; // Array of comment IDs, allowing nested comments or replies
}

// Mongoose Schema for Comment
const CommentSchema: Schema = new Schema({
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to Post model
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Self-reference for replies
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Mongoose Model for Comment
const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment };
