import jwt from 'jsonwebtoken';
import { createError } from '../error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, 'Unauthorized access'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, 'Invalid or expire token'));
        }
        req.user = user;
        next();
    });
};
