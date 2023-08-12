import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        likes: {
            type: Number,
            default: 0,
        },
        unLikes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model('Video', VideoSchema);
