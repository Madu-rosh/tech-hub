import { Request, Response } from 'express';
import { Post } from '../database/models/posts.model'; // Update the path according to your project structure

// Create a new post
export const createPost = async (req: Request, res: Response) => {
    try {
        if (!['admin', 'author'].includes(req.user!.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        const { title, content, author } = req.body; // Assuming these are the fields you have in your Post model
        const newPost = new Post({
            title,
            content,
            author,
            approved: false // Posts are not approved by default
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Approve a post
export const approvePost = async (req: Request, res: Response) => {
    try {
        if (!['admin'].includes(req.user!.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        const { postId } = req.params;
        const updatedPost = await Post.findByIdAndUpdate(postId, { approved: true }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
    try {
        if (!['admin', 'author'].includes(req.user!.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        const { postId } = req.params;
        const postUpdate = await Post.findByIdAndUpdate(postId, req.body, { new: true });
        if (!postUpdate) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(postUpdate);
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
    try {
        if (!['admin', 'author'].includes(req.user!.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        const { postId } = req.params;
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send(); // No content to return, but indicate success
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Get all approved posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({ approved: true });
        res.json(posts);
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Get a specific post by ID
export const getPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
