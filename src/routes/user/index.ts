import express from 'express';
import { createUser, deleteUser } from '../../controllers/user.controllers';

const router = express.Router();

router.post('/', createUser);
router.delete('/', deleteUser)

export default router;