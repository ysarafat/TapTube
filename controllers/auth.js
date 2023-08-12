import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createError } from '../error.js';
import User from '../models/user.js';
// SIGNUP USER
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hashPassword });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User has been created',
        });
    } catch (error) {
        next(createError(409, 'username or email is already in use'));
    }
};
// SIGNIN USER
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            return next(createError(404, 'User not found!'));
        }
        const checkPassword = await bcrypt.compare(req.body.password, user?.password);
        if (!checkPassword) {
            return next(createError(401, 'Authentication failed! Wrong credentials'));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password, ...other } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json({
                success: true,
                message: 'Authentication Successful',
                data: other,
            });
    } catch (error) {
        next(createError(500, 'Something was wrong!'));
    }
};
