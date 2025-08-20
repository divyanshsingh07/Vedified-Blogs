import mongoose from "mongoose";

let isConnected = false;

// Tweak buffering timeout so queries don't hang silently
mongoose.set('bufferTimeoutMS', 15000);

const connectDB = async () => {
    try {
        if (isConnected) {
            return;
        }

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not set. Add it to your environment variables.");
        }

        mongoose.connection.on('connected', () => console.log("Database Connected"));
        mongoose.connection.on('error', (err) => console.error("Mongo connection error:", err.message));
        mongoose.connection.on('disconnected', () => console.warn("MongoDB disconnected"));

        const baseUri = process.env.MONGODB_URI.trim();
        const dbName = process.env.DB_NAME || 'vedified-blogs';

        // If the URI already includes a database segment or query, use as-is.
        // Otherwise, append the DB_NAME.
        let finalUri = baseUri;
        const hasDbPath = /mongodb(?:\+srv)?:\/\/[^/]+\/[^?]+/.test(baseUri);
        if (!hasDbPath) {
            finalUri = baseUri.endsWith('/') ? `${baseUri}${dbName}` : `${baseUri}/${dbName}`;
        }

        await mongoose.connect(finalUri, {
            serverSelectionTimeoutMS: 15000,
            maxPoolSize: 10,
        });
        isConnected = true;
        console.log(`Connected to MongoDB @ ${hasDbPath ? '(from URI)' : dbName}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        throw error;
    }
};

export default connectDB;