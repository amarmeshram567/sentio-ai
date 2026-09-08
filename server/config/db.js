import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.warn("MONGO_URI is not set. Running without MongoDB persistence.");
            return false;
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
        return true;
    } catch (error) {
        console.warn("Database connection failed. Falling back to in-memory storage:", error.message);
        return false;
    }
};

export default connectDB;