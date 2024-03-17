import express from 'express';
import {
    getCommentsByPost,
    createComment,
    editComment,
    deleteComment
} from '../controllers/comment.controller';
import { verifyToken, verifyTokenAndRole } from '../middleware/auth.middleware'; // Adjust according to your implementation

const router = express.Router();

// Get comments by post
router.get('/:postId', getCommentsByPost);

// Create a comment (Available to all authenticated users)
router.post('/:postId', verifyToken, createComment);

// Edit a comment (Users can edit their own comments)
router.put('/:commentId', verifyToken, editComment);

// Delete a comment (Admins and authors can delete any comments)
router.delete('/:commentId', verifyTokenAndRole(['admin', 'author']), deleteComment);

export default router;
