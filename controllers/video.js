import { createError } from '../error.js';
import User from '../models/user.js';
import Video from '../models/video.js';
// ADD A VIDEO
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const saveVideo = await newVideo.save();
        res.status(200).json({
            success: true,
            message: 'Video add successfully',
            data: saveVideo,
        });
    } catch (error) {
        next(error);
    }
};
// UPDATE A VIDEO
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            next(createError(404, 'Video not found'));
        }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json({
                success: true,
                message: 'Video update successfully',
                data: updatedVideo,
            });
        } else {
            next(createError(403, 'You can update only your video'));
        }
    } catch (error) {
        next(error);
    }
};
// DELETE A VIDEO
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            next(createError(404, 'Video not found'));
        }
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Video delete successfully',
                data: updatedVideo,
            });
        } else {
            next(createError(403, 'You can delete only your video'));
        }
    } catch (error) {
        next(error);
    }
};
// GET a VIDEO
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: video,
        });
    } catch (error) {
        next(error);
    }
};
// UPDATE VIDEO VIEW
export const updateView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json({
            success: true,
            message: 'Video view update successfully',
        });
    } catch (error) {
        next(error);
    }
};
//  GET TREND VIDEO
export const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json({
            success: true,
            data: videos,
        });
    } catch (error) {
        next(error);
    }
};
// GET RANDOM VIDEO
export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json({
            success: true,
            data: videos,
        });
    } catch (error) {
        next(error);
    }
};
// GET SUBSCRIBE VIDEO
export const subscribeVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const subscribeChannels = user.subscribedUsers;
        const list = Promise.all(
            subscribeChannels.map((channelId) => Video.find({ userId: channelId }))
        );
        res.status(200).json((await list).flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        next(error);
    }
};
// GET  VIDEO BY TAGS
export const getByTags = async (req, res, next) => {
    const { tags } = req.query;
    const tagsArray = tags.split(',');

    try {
        const videos = await Video.find({ tags: { $in: tagsArray } }).limit(20);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
};
// GET  VIDEO BY SEARCH
export const getBySearch = async (req, res, next) => {
    const query = req.query.q;

    try {
        const videos = await Video.find({ title: { $regex: query, $options: 'i' } }).limit(40);
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
};
