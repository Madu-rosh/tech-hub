import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Assuming you have a User model with roles
import { User } from '../database/models/users.model'; // Adjust the path according to your project structure

interface UserPayload {
    id: string;
    email: string;
    role: 'admin' | 'author' | 'user';
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload; // Extending Express Request to include the user property
        }
    }
}

// Middleware to verify JWT token and attach user to request
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming Bearer token format

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware to check user role
export const verifyTokenAndRole = (roles: Array<'admin' | 'author' | 'user'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        verifyToken(req, res, () => {
            if (req.user && roles.includes(req.user.role)) {
                next();
            } else {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }
        });
    };
};
