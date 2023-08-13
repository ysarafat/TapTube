import { createError } from '../error.js';
import Comment from '../models/comment.js';
import Video from '../models/video.js';
// ADD COMMENT
export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (error) {
        next(error);
    }
};
// DELETE COMMENT
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.params.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: 'The comment has been deleted',
            });
        } else {
            return next(createError(403, 'You can delete only your comment'));
        }
    } catch (error) {
        next(error);
    }
};
// GET COMMENT
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
};
