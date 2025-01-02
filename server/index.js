import pkg from "express";
import express, { response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet'
import connectDB from './config/connectdb.js';
import userRouter from './route/user.route.js';

//Configure .env
dotenv.config();


//initializes an instance of an Express.js application, where express is a framework for building web servers and APIs in Node.js
const app = express();
//Adds the CORS middleware to the application
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));


//This method mounts middleware to your Express app. Middleware functions are executed for every incoming request before your route handlers are called.
app.use(express.json())

//middleware library for Express that parses the Cookie header in HTTP requests.
app.use(cookieParser())
//morgan is an HTTP request logger middleware for Node.js and Express.
app.use(morgan())
//helmet middleware in an Express.js application to enhance security by setting HTTP headers, while customizing the behavior of the crossOriginResourcePolicy feature.
app.use(helmet({
    crossOriginResourcePolicy: false
}))



//Define a PORT
const PORT = 8080 || process.env.PORT


//Create a Route
app.get('/', (req, res) => {
    //server to client
    res.send('Assalamu Alaikum, This is Express');
});


app.use('/api/user', userRouter)

//Check Connection of Database
connectDB().then(() =>{
    //Start the server
    app.listen(PORT, () => {
        console.log(`\x1b[44mServer is Running on http://localhost:${PORT}\x1b[0m`);
    });
})
