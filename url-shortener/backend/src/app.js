import express from 'express';
import cors from 'cors';

import urlRoutes from './routes/url.routes.js';
import { redirectUrl } from './controllers/url.controller.js';

import authRoutes from './routes/auth.routes.js';

//Delete After
import protectedRoutes from './routes/protected.routes.js';

const app = express();

app.use(cors());

app.use((req, res, next) => {

    res.setHeader(
        'Cross-Origin-Opener-Policy',
        'same-origin-allow-popups'
    );

    next();

});

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("API running");
});

app.use('/api/v1', urlRoutes);

//Delete After
app.use('/protected', protectedRoutes);

app.use('/auth', authRoutes);

app.get('/:code', redirectUrl);


export default app;