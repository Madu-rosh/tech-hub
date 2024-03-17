import mongoose, { Document, Schema } from 'mongoose';

// TypeScript Interface
export interface IUser extends Document {
    name: string;
    username: string;
    role: 'admin' | 'user' | 'author';
    email: string;
    password: string;
    createdAt?: Date;
    age: number;
}

// Mongoose Schema
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'author'],
        default: 'user',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    age: {
        type: Number,
        validate: {
            validator: function (value: number): boolean {
                return value >= 18;
            },
            message: "Age must be at least 18.",
        },
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Mongoose Model
const User = mongoose.model<IUser>('User', UserSchema);

export { User };
