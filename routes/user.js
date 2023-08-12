import express from 'express';
import { deleteUser, getUser, updateUser } from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
// CREATE A USER
router.put('/:id', verifyToken, updateUser);
// DELETE USER
router.delete('/:id', verifyToken, deleteUser);
// GET A USER
router.get('/find/:id', getUser);

export default router;
