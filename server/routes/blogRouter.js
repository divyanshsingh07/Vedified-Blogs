import express from 'express';
import multer from 'multer';
import { createBlog, getBlogs, getAllBlogs, getBlogById, deleteBlogById, togglePublishedStatus, deleteComment, updateBlog, generateContent } from '../controlers/blogControler.js';
import jwt from 'jsonwebtoken';
import { addComment, getBlogComments } from '../controlers/blogControler.js';


const router = express.Router();

// Authentication middleware
const authenticateToken = (req, res, next) => {
    console.log('=== AUTH DEBUG ===');
    console.log('All headers:', req.headers);
    
    // Check for authorization header in different cases
    const authHeader = req.headers['authorization'] || req.headers['Authorization'] || req.headers['AUTHORIZATION'];
    console.log('Found auth header:', authHeader);
    
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    console.log('Extracted token:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    
    if (!token) {
        console.log('No token found');
        return res.json({
            success: false,
            message: "Access token is required",
            debug: {
                receivedHeaders: Object.keys(req.headers),
                authHeader: authHeader
            }
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('JWT verification error:', err.message);
            return res.json({
                success: false,
                message: "Invalid or expired token"
            });
        }
        console.log('JWT verified successfully, user:', user);
        req.user = user;
        next();
    });
};

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Blog routes
router.get('/', getBlogs); 
router.get('/all', getAllBlogs);
router.post('/create', authenticateToken, upload.single('image'), createBlog);
router.post('/add', authenticateToken, upload.single('image'), createBlog);
router.put('/:blogId', authenticateToken, upload.single('image'), updateBlog); 
router.post('/addComment', authenticateToken, addComment); 
router.delete('/comment/:commentId', authenticateToken, deleteComment);
router.get('/:blogId/comments', getBlogComments);
router.get('/:blogId', getBlogById); 
router.delete('/:blogId', authenticateToken, deleteBlogById); 
router.post('/:id/togglePublish', authenticateToken, togglePublishedStatus); 
router.post('/togglePublish', authenticateToken, togglePublishedStatus); 
router.post('/generateContent', authenticateToken, generateContent); 

// Test endpoint for AI generation (no auth required for debugging)
router.post('/test-ai', async (req, res) => {
  try {
    const { title, category } = req.body;
    console.log('🧪 Testing AI endpoint with:', { title, category });
    
    if (!title || !category) {
      return res.json({
        success: false,
        message: "Title and category are required for testing"
      });
    }
    
    // Import and test the Gemini function
    const { generateBlogContent } = await import('../configs/gemini.js');
    const content = await generateBlogContent(title, category);
    
    res.json({
      success: true,
      message: "AI test successful",
      data: { content }
    });
  } catch (error) {
    console.error('❌ AI test failed:', error);
    res.json({
      success: false,
      message: error.message
    });
  }
});

export default router;