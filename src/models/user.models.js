import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    fullName: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // Cloudinary Url
        require: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
        type: String,
    }
},
    {
        timestamps:true
    }
);

export const User = mongoose.model("user", userSchema)