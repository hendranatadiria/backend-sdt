import express from 'express';
import { createUser, deleteUser, updateUser } from '../../controllers/user.controllers';

const router = express.Router();

router.post('/', createUser);
router.delete('/', deleteUser);
router.put('/', updateUser);

export default router;