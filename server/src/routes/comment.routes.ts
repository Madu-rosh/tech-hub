import express from 'express';
import {
    createComment,
    editComment,
    deleteComment
} from '../controllers/comment.controller';
import { verifyToken, verifyTokenAndRole } from '../middleware/auth.middleware'; // Adjust according to your implementation

const router = express.Router();

// Create a comment (Available to all authenticated users)
router.post('/:postId/comments', verifyToken, createComment);

// Edit a comment (Users can edit their own comments)
router.put('/comments/:commentId', verifyToken, editComment);

// Delete a comment (Admins and authors can delete any comments)
router.delete('/comments/:commentId', verifyTokenAndRole(['admin', 'author']), deleteComment);

export default router;
