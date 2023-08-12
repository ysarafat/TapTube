import { createError } from '../error';

export const updateUser = async (req, res, next) => {
    try {
        console.log(req.body);
    } catch (error) {
        next(createError(500, 'Something was wrong!'));
    }
};
