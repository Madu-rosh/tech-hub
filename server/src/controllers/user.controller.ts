import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/users.model'; // Adjust the path according to your project structure

// User Registration
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role = 'user' } = req.body; // Default role is 'user'
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        // Optionally, you could log the user in immediately after registration
        // by generating a token and sending it back as done in loginUser()

        res.status(201).json({ message: 'User registered successfully' });
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

// User Login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
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

// Function to fetch user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // Assuming user ID is added to the request by the verifyToken middleware
        const user = await User.findById(req.user!.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
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

// Function to update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.user!.id, updates, { new: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json(updatedUser);
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
