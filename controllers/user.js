import { createError } from '../error.js';
import User from '../models/user.js';

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updateUserData = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: 'User Updated',
                data: updateUserData,
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, 'You can update only your account'));
    }
};
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, 'You can delete only your account'));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json({
            success: true,
            data: others,
        });
    } catch (error) {
        next(error);
    }
};
