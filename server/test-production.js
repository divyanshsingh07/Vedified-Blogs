// Production Test Script
// Use this to test your production API manually

const testEndpoints = {
  // 1. Test environment variables
  envCheck: 'https://vedified-blogs-server.vercel.app/env-check',
  
  // 2. Test health
  health: 'https://vedified-blogs-server.vercel.app/health',
  
  // 3. Test database connection (simple blog creation)
  debugCreate: 'https://vedified-blogs-server.vercel.app/api/blog/debug-create',
  
  // 4. Test authentication
  login: 'https://vedified-blogs-server.vercel.app/api/admin/login'
};

console.log('🔍 Production Test Endpoints:');
console.log(JSON.stringify(testEndpoints, null, 2));

// Instructions:
console.log(`
📋 DEBUGGING STEPS:

1. Test Environment Variables:
   GET ${testEndpoints.envCheck}
   
2. Test Health:
   GET ${testEndpoints.health}
   
3. Test Database & Basic Blog Creation:
   POST ${testEndpoints.debugCreate}
   Body: {} (empty)
   
4. Test Login (get token):
   POST ${testEndpoints.login}
   Body: {
     "email": "your_admin_email",
     "password": "your_admin_password"
   }
   
5. Test Blog Creation with Authentication:
   POST https://vedified-blogs-server.vercel.app/api/blog/add
   Headers: {
     "Authorization": "Bearer YOUR_TOKEN_FROM_STEP_4",
     "Content-Type": "multipart/form-data"
   }
   Body: FormData with Blog field and image
   
🚨 COMMON ISSUES:
- Environment variables not set in Vercel
- MongoDB connection string incorrect
- ImageKit credentials invalid
- Authentication token issues
- File upload format problems
`);
