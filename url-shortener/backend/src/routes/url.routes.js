import express from 'express';

import { shortenUrl, getQRCode } from '../controllers/url.controller.js';

import { optionalAuth } from '../middleware/optionalAuth.middleware.js';

const router = express.Router();

router.post('/shorten', optionalAuth, shortenUrl);
router.get('/qrcode/:code', getQRCode);

export default router;