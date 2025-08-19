import dotenv from 'dotenv';
import ImageKit from 'imagekit';
import fs from 'fs';

// Load environment variables
dotenv.config();

console.log('=== TESTING IMAGEKIT CREDENTIALS ===');
console.log('Environment variables loaded:');
console.log('IMAGEKIT_PUBLIC_KEY:', process.env.IMAGEKIT_PUBLIC_KEY);
console.log('IMAGEKIT_PRIVATE_KEY:', process.env.IMAGEKIT_PRIVATE_KEY ? 'SET' : 'NOT SET');
console.log('IMAGEKIT_URL_ENDPOINT:', process.env.IMAGEKIT_URL_ENDPOINT);

try {
    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });

    console.log('\nImageKit instance created successfully');
    
    // Test authentication by getting account info
    console.log('\nTesting authentication...');
    
    // This will test if credentials are valid
    const authParams = imagekit.getAuthenticationParameters();
    console.log('Authentication parameters generated:', authParams);
    
    console.log('\n✅ ImageKit credentials are working!');
    
    // Test actual upload functionality
    console.log('\nTesting upload functionality...');
    
    // Create a simple test file
    const testContent = 'This is a test file for ImageKit';
    const testFilePath = 'test-upload.txt';
    fs.writeFileSync(testFilePath, testContent);
    
    console.log('Test file created:', testFilePath);
    
    // Try to upload the test file
    const fileBuffer = fs.readFileSync(testFilePath);
    console.log('File read, size:', fileBuffer.length);
    
    const uploadResponse = await imagekit.upload({
        file: fileBuffer,
        fileName: 'test-upload.txt',
        folder: "/test",
    });
    
    console.log('✅ Upload successful!');
    console.log('Upload response:', uploadResponse);
    
    // Clean up test file
    fs.unlinkSync(testFilePath);
    console.log('Test file cleaned up');
    
} catch (error) {
    console.error('\n❌ ImageKit error:', error.message);
    console.error('Full error:', error);
}
