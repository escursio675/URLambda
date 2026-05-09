import { OAuth2Client } from 'google-auth-library';

import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

export const authenticateWithGoogle = async (googleToken) => {

    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const { sub: googleId, email, name, picture: avatar } = ticket.getPayload();

    let user = await User.findOne({ email });

    if(!user){

        user = await User.create(
            {
                googleId,
                email,
                name,
                avatar
            }
        );

    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    return {
        message: 'Authentication successful',
        token,
        user
    };

};