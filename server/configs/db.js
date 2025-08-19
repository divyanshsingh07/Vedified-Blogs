import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not set. Add it to your environment variables.");
        }

        mongoose.connection.on('connected', () => console.log("Database Connected"));

        const baseUri = process.env.MONGODB_URI.trim();
        const dbName = process.env.DB_NAME || 'vedified-blogs';

        // If the URI already includes a database segment or query, use as-is.
        // Otherwise, append the DB_NAME.
        let finalUri = baseUri;
        const hasDbPath = /mongodb(?:\+srv)?:\/\/[^/]+\/[^?]+/.test(baseUri);
        if (!hasDbPath) {
            finalUri = baseUri.endsWith('/') ? `${baseUri}${dbName}` : `${baseUri}/${dbName}`;
        }

        await mongoose.connect(finalUri);
        console.log(`Connected to MongoDB @ ${hasDbPath ? '(from URI)' : dbName}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // In serverless boot, avoid crashing the function on init.
        // Endpoints that require DB will surface errors when used.
    }
};

export default connectDB;