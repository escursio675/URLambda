import { authenticateWithGoogle } from '../services/auth.service.js';

export const googleAuth = async (req, res) => {

    try{

        const result = await authenticateWithGoogle(req.body.googleToken);

        return res.status(200).json(result);

    } catch(err){

        console.error(err.message);

        return res.status(500).json({
            error: err.message
        });

    }

};

export const verifyAuth = async (req, res) => {

    try {

        return res.status(200).json({
            success: true,
            user: req.user
        });

    } catch(err){

        console.error(err.message);

        return res.status(500).json({
            error: err.message
        });

    }

};