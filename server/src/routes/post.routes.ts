import express from 'express';
import {
    createPost,
    approvePost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
} from '../controllers/post.controller';
import { verifyTokenAndRole } from '../middleware/auth.middleware'; // Update the path as necessary

const router = express.Router();

// Protected routes require a valid token and appropriate user role
router.post('/', verifyTokenAndRole(['admin', 'author']), createPost);
router.put('/:postId', verifyTokenAndRole(['admin', 'author']), updatePost);
router.delete('/:postId', verifyTokenAndRole(['admin', 'author']), deletePost);

// Approving a post is restricted to admins
router.put('/approve/:postId', verifyTokenAndRole(['admin']), approvePost);

// These routes are public; no token required
router.get('/', getAllPosts);
router.get('/:postId', getPost);

export default router;
