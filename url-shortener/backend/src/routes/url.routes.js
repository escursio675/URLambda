import express from 'express';

import { shortenUrl, getQRCode } from '../controllers/url.controller.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/qrcode/:code', getQRCode);

export default router;