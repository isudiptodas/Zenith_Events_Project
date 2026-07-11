import mongoose from "mongoose";

export const connectDb = async () => {
    const URI = process.env.MONGODB_URI as string;

    try {
        await mongoose.connect(URI);
        console.log(`Database connected`);
    } catch (error) {
        console.log(`Database connection error -> ${error}`);
    }
}