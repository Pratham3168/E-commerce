import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/connectDB.js';


const startServer = async () => {
    try{
        //connect to mongoDb 
        await connectDB();

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch(error){
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
}

//start the server
startServer();