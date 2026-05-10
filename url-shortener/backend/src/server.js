import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT;


const startServer = async() =>{

    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI not defined');
        process.exit(1);
    }

    await connectDB();

    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();