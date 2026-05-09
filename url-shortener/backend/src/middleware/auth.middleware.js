import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

export const checkAuthToken = async (req, res, next) => {

    try{

        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(401).json({
                error: 'Authorized Failed / Unauthorized'
            });

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId);

        if(!user)
            return res.status(401).json({
                error: 'User not found'
            });

        req.user = {
            userId: user._id,
            email: user.email
        };

        next();

    } catch(err){

        console.error(err.message);

        return res.status(401).json({
            error: 'Invalid token'
        });

    }

};