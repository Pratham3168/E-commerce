// console.log("SERVER.JS STARTED");
// throw new Error("TEST");


// import dotenv from "dotenv";

// dotenv.config();


// import app from './src/app.js';
// import connectDB from './src/config/connectDB.js';


// const startServer = async () => {
//     try{
//         //connect to mongoDb 
//         await connectDB();

//         const PORT = process.env.PORT || 3000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     }
//     catch(error){
//         console.error("Error starting server:", error.message);
//         process.exit(1);
//     }
// }

// //start the server
// startServer();


import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./src/app.js");
const { default: connectDB } = await import("./src/config/connectDB.js");

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();