import express from 'express';
import { addComment, deleteComment, getComments } from '../controllers/comment.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
// ADD COMMENT
router.post('/', verifyToken, addComment);
// DELETE COMMENT
router.delete('/:id', verifyToken, deleteComment);
// DELETE COMMENT
router.get('/:videoId', getComments);
export default router;
