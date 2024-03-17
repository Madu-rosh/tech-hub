import { Request, Response } from 'express';
import { Comment } from '../database/models/comments.model'; // Update this path as necessary

//view comments
export const getCommentsByPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('author', 'name'); // Adjust according to your needs
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: (error as any).message || "An unknown error occurred" });
    }
};

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const newComment = new Comment({
            content,
            post: postId, // Make sure the field name matches your Comment model schema
            author: req.user!.id // Assuming user ID is attached to req by middleware
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: (error as any).message || "An unknown error occurred" });
    }
};

// Edit a comment
export const editComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user!.id && req.user!.role !== 'admin' && req.user!.role !== 'author') {
            return res.status(403).json({ message: 'Unauthorized to edit this comment' });
        }

        comment.content = content;
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: (error as any).message || "An unknown error occurred" });
    }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(204).send(); // Success, no content
    } catch (error) {
        res.status(500).json({ message: (error as any).message || "An unknown error occurred" });
    }
};

// Show comments for a specific post by post ID
export const showCommentsByPostId = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('author', 'username'); // Populate author details if needed
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: (error as any).message || "An unknown error occurred" });
    }
};
