import express from 'express';
import { getUserProfile, registerUser, loginUser, updateUserProfile } from '../controllers/user.controller';
import { verifyTokenAndRole } from '../middleware/auth.middleware';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected routes for fetching and updating user profile
router.get('/profile', verifyTokenAndRole, getUserProfile);
router.put('/profile', verifyTokenAndRole, updateUserProfile);

export default router;
