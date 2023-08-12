import express from 'express';
import { updateUser } from '../controllers/user.js';

const router = express.Router();

//  UPDATE USER
router.put('/:id', updateUser);
// DELETE USER
// GET A USER
// SUBSCRIBE A USER
// UNSUBSCRIBE A USER
// LIKE A VIDEO
// UNLIKE A VIDEO

export default router;
