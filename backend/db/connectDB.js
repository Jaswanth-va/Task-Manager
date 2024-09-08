import mongoose from "mongoose";


// Function to connect to DB

export default function connectDB(URI){
    mongoose.connect(URI);
}   