import { Request, Response } from 'express';
import { Comment } from '../database/models/comments.model'; // Update this path as necessary

// Assuming Comment model has fields: { _id, content, author, postId }

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const newComment = new Comment({
            content,
            postId,
            author: req.user!.id // Assuming user ID is attached to req by middleware
        });
        await newComment.save();
        res.status(201).json(newComment);
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
        if (typeof error === "object" && error !== null && "message" in error) {
            // Now it's safe to access error.message
            res.status(500).json({ message: error.message });
        } else {
            // Handle the case where the error is not an object or doesn't have a message property
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(204).send(); // Success, no content
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
