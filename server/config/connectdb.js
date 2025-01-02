// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config()

// Check if MONGO_URI is provided in the .env file
if(!process.env.MONGO_URI){
    throw new Error(
        "Please provide MONGO_URI in the .env file"
    )
}

// Function to connect to MongoDB
async function connectDB(){
    try{
        // Attempt to connect to MongoDB using the provided URI
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected DB")
    } catch (error){
        // Log any connection errors and exit the process
        console.log("MongoDB Connection Error", error)
        process.exit(1)
    }
}

// Export the connectDB function for use in other parts of the application
export default connectDB