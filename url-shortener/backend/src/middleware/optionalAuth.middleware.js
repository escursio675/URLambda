import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

export const optionalAuth = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // No token → continue as guest
        if (!authHeader) {
            return next();
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId);

        // Invalid user → continue as guest
        if (!user) {
            return next();
        }

        req.user = {
            userId: user._id,
            email: user.email
        };

        next();

    } catch (err) {

        // Invalid token → continue as guest
        next();

    }

};