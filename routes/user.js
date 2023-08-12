import express from 'express';
import {
    deleteUser,
    getUser,
    subscribeUser,
    unSubscribeUser,
    updateUser,
} from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
// CREATE A USER
router.put('/:id', verifyToken, updateUser);
// DELETE USER
router.delete('/:id', verifyToken, deleteUser);
// GET A USER
router.get('/find/:id', getUser);
// SUBSCRIBE A USER
router.put('/subscribe/:id', verifyToken, subscribeUser);
// UNSUBSCRIBE A USER
router.put('/subscribe/:id', verifyToken, unSubscribeUser);

export default router;
