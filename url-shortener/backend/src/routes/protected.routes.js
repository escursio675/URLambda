import express from 'express';

import { checkAuthToken } from '../middleware/auth.middleware.js';

import { getUserUrls, deleteUserUrl } from '../controllers/url.controller.js';

const router = express.Router();



router.get(
    '/my-urls',
    checkAuthToken,
    getUserUrls
);

router.delete(
    '/my-urls/delete/:id',
    checkAuthToken,
    deleteUserUrl
);

export default router;