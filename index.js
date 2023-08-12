import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

// default configuration
const app = express();
const PORT = process.env.PORT || 8800;
dotenv.config();

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
// server listing
app.listen(PORT, () => {
    connect();
    console.log(`server running on http://localhost:${PORT}`);
});
