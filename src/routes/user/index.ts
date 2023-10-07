import express from 'express';
import { createUser } from '../../controllers/user.controllers';

const router = express.Router();

router.post('/', createUser);

router.delete('/', (req, res) => {
  res.send('Hello World!');
})

export default router;