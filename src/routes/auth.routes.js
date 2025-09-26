import { signup, signin } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/sign-in', signin);

router.post('/sign-up', signup);

router.post('/sign-out', (req, res) => {
  // Handle logout logic here
  res.status(200).send('Logout successful');
});

export default router;
