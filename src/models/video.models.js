import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    views: {
        type: Number,
        require: true,
    },
    duration: {
        type: Number,
        require: true,
    },
    isPublished: {
        type: Boolean,
        require: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
})

export const Video = mongoose.model("Video", videoSchema)