import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        
        const dbName = process.env.DB_NAME || 'vedified-blogs';
        await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        
        console.log(`Connected to database: ${dbName}`);
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDB;