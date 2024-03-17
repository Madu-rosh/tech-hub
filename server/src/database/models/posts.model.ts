import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './users.model'; // Import the IUser interface for type safety
import { IComment } from './comments.model'; // Import the IComment interface for type safety

// TypeScript Interface for Post
export interface IPost extends Document {
    title: string;
    content: string;
    author: IUser['_id']; // Reference to IUser's _id for author field
    approved: boolean; // Indicates if the post is approved by an admin
    comments: Array<IComment['_id']>; // List of references to IComment's _id
}

// Mongoose Schema for Post
const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    approved: { type: Boolean, required: true, default: false }, // Default not approved
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // References to Comment model
}, {
    timestamps: true, // Optionally add this to automatically add `createdAt` and `updatedAt` fields
});

// Mongoose Model for Post
const Post = mongoose.model<IPost>('Post', PostSchema);

export { Post };
