import express from 'express';
import cors from 'cors';

import urlRoutes from './routes/url.routes.js';
import { redirectUrl } from './controllers/url.controller.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send("API running");
});

app.use('/api/v1', urlRoutes);

app.get('/:code', redirectUrl);

export default app;