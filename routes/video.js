import express from 'express';
import {
    addVideo,
    deleteVideo,
    getByTags,
    getVideo,
    randomVideo,
    trendVideo,
    updateVideo,
    updateView,
} from '../controllers/video.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
// ADD VIDEO
router.post('/', verifyToken, addVideo);
// UPDATE VIDEO
router.put('/update/:id', verifyToken, updateVideo);
// DELETE VIDEO
router.put('/delete/:id', verifyToken, deleteVideo);
// GET A VIDEO
router.put('/find/:id', getVideo);
// UPDATE VIDEO VIEW
router.put('/view/:id', verifyToken, updateView);
//  GET TREND VIDEO
router.get('/trend', trendVideo);
// GET RANDOM VIDEO
router.get('/random', randomVideo);
// GET SUBSCRIBE VIDEO
router.get('/sub', verifyToken, randomVideo);
// GET  VIDEO BY TAGS
router.get('/tags', getByTags);
// GET  VIDEO BY SEARCH
router.get('/search', randomVideo);
export default router;
