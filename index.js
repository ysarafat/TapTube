import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouters from './routes/auth.js';
import commentRouters from './routes/comment.js';
import userRouters from './routes/user.js';
import videoRouters from './routes/video.js';
// default configuration
const app = express();
const PORT = process.env.PORT || 8800;
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// connect to db
const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connect to db');
        })
        .catch((err) => {
            throw err;
        });
};
// routers
app.use('/api/auth', authRouters);
app.use('/api/user', userRouters);
app.use('/api/video', videoRouters);
app.use('/api/comment', commentRouters);
// DEFAULT ERROR HANDLING
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});
// server listing
app.listen(PORT, () => {
    connect();
    console.log(`server running on http://localhost:${PORT}`);
});
