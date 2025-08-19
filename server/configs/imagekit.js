import ImageKit from 'imagekit';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

console.log('=== IMAGEKIT CONFIG DEBUG ===');
console.log('Environment variables:', {
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY ? 'SET' : 'NOT SET',
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT
});

// Validate required environment variables
if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
    throw new Error('Missing required ImageKit environment variables. Please check your .env file.');
}

// Create ImageKit instance with explicit property assignment
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Verify the instance was created correctly
console.log('ImageKit instance created with:', {
    publicKey: imagekit.publicKey,
    privateKey: imagekit.privateKey ? 'SET' : 'NOT SET',
    urlEndpoint: imagekit.urlEndpoint
});

// Test authentication
try {
    const authParams = imagekit.getAuthenticationParameters();
    console.log('✅ ImageKit authentication test passed');
} catch (error) {
    console.error('❌ ImageKit authentication test failed:', error.message);
}

export default imagekit;