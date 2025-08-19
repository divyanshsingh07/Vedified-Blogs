import imagekit from "../configs/imagekit.js";
import fs from "fs";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";
import { generateBlogContent } from '../configs/gemini.js';

// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({
            success: true,
            message: "Blogs retrieved successfully",
            data: blogs
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.json({success: false, message: error.message});
    }
};

export const createBlog = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.file);
        
        // Check if Blog field exists
        if (!req.body.Blog) {
            return res.json({
                success: false, 
                message: "Blog field is missing. Please send data in 'Blog' field.",
                receivedFields: Object.keys(req.body)
            });
        }
        
        // Parse Blog data
        let blogData;
        try {
            blogData = JSON.parse(req.body.Blog);
        } catch (parseError) {
            return res.json({
                success: false, 
                message: "Invalid JSON in Blog field",
                receivedBlog: req.body.Blog,
                parseError: parseError.message
            });
        }
        
        const {title, subtitle, description, category, isPublished = false} = blogData;
        const imgFile = req.file;

       if(!title || !subtitle || !description || !category || !imgFile){
            return res.json({
                success: false, 
                message: "All fields are required",
                missingFields: {
                    title: !title,
                    subtitle: !subtitle,
                    description: !description,
                    category: !category,
                    image: !imgFile
                }
            });
        }
        
        // Upload image to imagekit
        console.log('=== IMAGEKIT DEBUG ===');
        console.log('ImageKit config:', {
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? 'SET' : 'NOT SET',
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        });
        
        try {
            const fileBuffer = fs.readFileSync(imgFile.path);
            console.log('File read successfully, size:', fileBuffer.length);
            
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imgFile.originalname,
                folder: "/blogs",
            });
            
            console.log('ImageKit upload response:', response);
            
            // Get imagekit url - try multiple methods
            let optimizedImageUrl;
            
            try {
                // Use the correct file path from response
                const filePath = response.filePath || response.file;
                console.log('Using file path:', filePath);
                
                // Method 1: Use imagekit.url() with transformations
                optimizedImageUrl = imagekit.url({
                    path: filePath,
                    transformation: [
                        {width: 1280},
                        {quality: "auto"},
                        {format: "webp"},
                    ],
                });
                
                console.log('Method 1 - Generated image URL:', optimizedImageUrl);
                
                // If Method 1 fails, try Method 2: Simple URL
                if (!optimizedImageUrl || optimizedImageUrl === '') {
                    optimizedImageUrl = imagekit.url({
                        path: filePath
                    });
                    console.log('Method 2 - Simple URL:', optimizedImageUrl);
                }
                
                // If both methods fail, use direct URL construction
                if (!optimizedImageUrl || optimizedImageUrl === '') {
                    optimizedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}${filePath}`;
                    console.log('Method 3 - Direct URL construction:', optimizedImageUrl);
                }
                
            } catch (urlError) {
                console.error('URL generation error:', urlError);
                // Fallback to direct URL construction using filePath
                const filePath = response.filePath || response.file;
                optimizedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}${filePath}`;
                console.log('Fallback URL:', optimizedImageUrl);
            }
            
            console.log('Final image URL:', optimizedImageUrl);
            console.log('Response file path:', response.filePath);
            console.log('Response file:', response.file);
            
            // Validate that we have a valid URL
            if (!optimizedImageUrl || optimizedImageUrl === '') {
                throw new Error('Failed to generate ImageKit URL. Response file: ' + response.file);
            }
            
            // Create blog with the image URL
            const blogData = {
                title, 
                subtitle, 
                description, 
                category, 
                image: optimizedImageUrl, 
                isPublished
            };
            
            console.log('Blog data to save:', blogData);
            
            // Validate blog data before saving
            if (!blogData.image || blogData.image === '') {
                throw new Error('Image URL is empty. Cannot save blog without image.');
            }
            
            const savedBlog = await Blog.create(blogData);
            console.log('Blog saved successfully:', savedBlog);
            
            // Clean up uploaded file
            fs.unlinkSync(imgFile.path);
            
            res.json({success: true, message: "Blog created successfully", blog: savedBlog});
            
        } catch (imagekitError) {
            console.error('ImageKit error:', imagekitError);
            console.error('Full ImageKit error details:', {
                message: imagekitError.message,
                stack: imagekitError.stack,
                name: imagekitError.name
            });
            
            // Clean up uploaded file on error
            if (imgFile.path) {
                fs.unlinkSync(imgFile.path);
            }
            
            res.json({
                success: false, 
                message: "Image upload failed",
                error: imagekitError.message,
                details: "Check server console for full error details"
            });
        }
        
    } catch (error) {
        console.error('Blog creation error:', error);
        res.json({success: false, message: error.message});
    }
}

// Get all published blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, message: "Blogs retrieved successfully", data: blogs});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Get blog by ID
export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({success: false, message: "Blog not found"});
        }
        res.json({success: true, message: "Blog retrieved successfully", data: blog});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Delete blog by ID
export const deleteBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findByIdAndDelete(blogId);
        if(!blog){
            return res.json({success: false, message: "Blog not found"});
        }
        //delete comments associated with the blog
        await Comment.deleteMany({blog: blogId});





        res.json({success: true, message: "Blog deleted successfully", data: blog});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Toggle published status
export const togglePublishedStatus = async (req, res) => {
    try {
        // Get ID from either params (URL) or body
        const id = req.params.id || req.body.id;
        
        if (!id) {
            return res.json({success: false, message: "Blog ID is required"});
        }
        
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({success: false, message: "Blog not found"});
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog published status updated successfully", data: blog});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Update blog by ID
export const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        console.log('Update blog request for ID:', blogId);
        console.log('Request body:', req.body);
        console.log('Request files:', req.file);
        
        // Check if Blog field exists
        if (!req.body.Blog) {
            return res.json({
                success: false, 
                message: "Blog field is missing. Please send data in 'Blog' field.",
                receivedFields: Object.keys(req.body)
            });
        }
        
        // Parse Blog data
        let blogData;
        try {
            blogData = JSON.parse(req.body.Blog);
        } catch (parseError) {
            return res.json({
                success: false, 
                message: "Invalid JSON in Blog field",
                receivedBlog: req.body.Blog,
                parseError: parseError.message
            });
        }
        
        const { title, subtitle, description, category } = blogData;
        
        if (!title || !description || !category) {
            return res.json({
                success: false, 
                message: "Title, description, and category are required",
                missingFields: {
                    title: !title,
                    description: !description,
                    category: !category
                }
            });
        }
        
        // Find existing blog
        const existingBlog = await Blog.findById(blogId);
        if (!existingBlog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        
        // Update basic fields
        existingBlog.title = title;
        existingBlog.subtitle = subtitle || '';
        existingBlog.description = description;
        existingBlog.category = category;
        
        // Handle image update if new image is provided
        if (req.file) {
            try {
                const fileBuffer = fs.readFileSync(req.file.path);
                console.log('New image file read successfully, size:', fileBuffer.length);
                
                const response = await imagekit.upload({
                    file: fileBuffer,
                    fileName: req.file.originalname,
                    folder: "/blogs",
                });
                
                console.log('New image uploaded to ImageKit:', response);
                
                // Get optimized image URL
                let optimizedImageUrl;
                try {
                    const filePath = response.filePath || response.file;
                    optimizedImageUrl = imagekit.url({
                        path: filePath,
                        transformation: [
                            {width: 1280},
                            {quality: "auto"},
                            {format: "webp"},
                        ],
                    });
                } catch (urlError) {
                    console.log('ImageKit URL generation error, using direct URL:', urlError.message);
                    optimizedImageUrl = response.url;
                }
                
                existingBlog.image = optimizedImageUrl;
                
                // Clean up uploaded file
                fs.unlinkSync(req.file.path);
                
            } catch (imageError) {
                console.error('Image upload error:', imageError);
                return res.json({ success: false, message: "Failed to upload new image" });
            }
        }
        
        // Save updated blog
        await existingBlog.save();
        
        res.json({
            success: true,
            message: "Blog updated successfully",
            data: existingBlog
        });
 
    } catch (error) {
        console.error('Update blog error:', error);
        res.json({ success: false, message: error.message });
    }
}


export const addComment = async (req, res) => {
    try{
        const{blog,name , content} = req.body;
        // Create comment with pending status by default
        await Comment.create({blog, name, content, isApproved: false});
        res.json({success: true, message: "Comment added successfully. It will be visible after admin approval."});

    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const getBlogComments = async (req, res) => {
    try{
        const{blogId} = req.params;
        // Only return approved comments for public view
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, message: "Comments retrieved successfully", data: comments});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndDelete(commentId);
        
        if (!comment) {
            return res.json({success: false, message: "Comment not found"});
        }
        
        res.json({success: true, message: "Comment deleted successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Generate blog content using Gemini AI
export const generateContent = async (req, res) => {
    try {
        const { title, category, subtitle } = req.body;
        
        if (!title || !category) {
            return res.json({
                success: false, 
                message: "Title and category are required for AI content generation"
            });
        }
        
        // Generate content using Gemini AI
        const content = await generateBlogContent(title, category, subtitle);
        
        res.json({
            success: true, 
            message: "Blog content generated successfully", 
            data: { content }
        });
    } catch (error) {
        console.error('AI content generation error:', error);
        res.json({
            success: false, 
            message: error.message || "Failed to generate AI content"
        });
    }
}