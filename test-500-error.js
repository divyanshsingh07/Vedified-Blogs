// Test script to reproduce the 500 error
// Run this in browser console on your admin page

async function testBlogCreation() {
    console.log('🧪 Testing blog creation...');
    
    // Get the current auth token from localStorage
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
    
    if (!token) {
        console.error('❌ No auth token found. Please login first.');
        return;
    }
    
    console.log('🔑 Using token:', token.substring(0, 20) + '...');
    
    // Create test form data
    const formData = new FormData();
    
    const blogData = {
        title: "Test Blog 500 Debug",
        subtitle: "Testing 500 error",
        description: "<p>This is a test to debug the 500 error</p>",
        category: "Technology",
        isPublished: true
    };
    
    formData.append('Blog', JSON.stringify(blogData));
    
    // Create a small test image (1x1 pixel PNG)
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.toBlob(async (blob) => {
        formData.append('image', blob, 'test.png');
        
        try {
            console.log('📤 Sending request...');
            
            const response = await fetch('https://vedified-blogs-server.vercel.app/api/blog/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            console.log('📊 Response status:', response.status);
            console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
            
            const data = await response.json();
            console.log('📊 Response data:', data);
            
            if (!response.ok) {
                console.error('❌ Request failed with status:', response.status);
                console.error('❌ Error data:', data);
            } else {
                console.log('✅ Success:', data);
            }
            
        } catch (error) {
            console.error('❌ Network error:', error);
        }
    }, 'image/png');
}

// Run the test
testBlogCreation();

console.log(`
📋 INSTRUCTIONS:
1. Open your admin panel in browser
2. Login to get authentication token  
3. Open browser console (F12)
4. Copy and paste this entire script
5. Press Enter to run the test
6. Check the console output for detailed error information
`);
