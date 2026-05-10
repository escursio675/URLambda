import express from 'express';

import { googleAuth, verifyAuth } from '../controllers/auth.controller.js';

import { checkAuthToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/google', googleAuth);
router.get('/verify', checkAuthToken, verifyAuth);

export default router;