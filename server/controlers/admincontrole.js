import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";
import { OAuth2Client } from "google-auth-library";

// Load admin accounts from environment variables (supports one or many)
// Options:
// - Single admin: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME (optional)
// - Multiple admins: ADMIN_EMAILS, ADMIN_PASSWORDS, ADMIN_NAMES (comma-separated)
const loadEnvAdminAccounts = () => {
    const envAccounts = [];

    // Multiple admins via comma-separated lists
    const emailsCsv = process.env.ADMIN_EMAILS;
    const passwordsCsv = process.env.ADMIN_PASSWORDS;
    const namesCsv = process.env.ADMIN_NAMES;

    if (emailsCsv && passwordsCsv) {
        const emailList = emailsCsv.split(",").map(s => s.trim()).filter(Boolean);
        const passwordList = passwordsCsv.split(",").map(s => s.trim());
        const nameList = (namesCsv ? namesCsv.split(",").map(s => s.trim()) : []);

        if (emailList.length !== passwordList.length) {
            console.warn("[admincontrole] ADMIN_EMAILS and ADMIN_PASSWORDS count mismatch; skipping env admin list.");
        } else {
            for (let i = 0; i < emailList.length; i++) {
                envAccounts.push({
                    email: emailList[i],
                    password: passwordList[i],
                    name: nameList[i] || "Admin"
                });
            }
        }
    }

    // Single admin fallback
    if (envAccounts.length === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
        envAccounts.push({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            name: process.env.ADMIN_NAME || "Admin"
        });
    }

    return envAccounts;
};

// Keep ONLY two dummy accounts as fallback
const DUMMY_ADMIN_ACCOUNTS = [
    {
        email: "admin@vedified.com",
        password: "admin123",
        name: "Super Admin"
    },
    {
        email: "editor@vedified.com",
        password: "editor123",
        name: "Content Editor"
    }
];

// Final admin accounts list (env-defined take precedence before dummies)
const ADMIN_ACCOUNTS = [
    ...loadEnvAdminAccounts(),
    ...DUMMY_ADMIN_ACCOUNTS
];

// Function to check if credentials match any admin account
const validateAdminCredentials = (email, password) => {
    return ADMIN_ACCOUNTS.find(admin => 
        admin.email === email && admin.password === password
    );
};

const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if credentials match any admin account
        const adminAccount = validateAdminCredentials(email, password);
        
        if (!adminAccount) {
            return res.json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }
        
        // Generate JWT token with admin info
        const token = jwt.sign({ 
            email: adminAccount.email,
            name: adminAccount.name,
            role: "admin"
        }, process.env.JWT_SECRET);
        
        res.json({
            success: true, 
            message: `Welcome back, ${adminAccount.name}!`, 
            token,
            admin: {
                name: adminAccount.name,
                email: adminAccount.email
            }
        });
    } catch (error) {
        res.json({success: false, message: error.message });
    }
}

const getAllBlogsAdmin = async (req, res) => {
    try{
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const getAllCommentsAdmin = async (req, res) => {
    try{
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1});
        res.json({success: true, comments});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const getDashboardData = async (req, res) => {
    try{
       const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
       const blogCount = await Blog.countDocuments();
       const commentCount = await Comment.countDocuments();
       const draftBlogs = await Blog.countDocuments({isPublished: false});
       const dashboardData = {
        recentBlogs,
        blogCount,
        commentCount,
        draftBlogs
       }
       res.json({success: true, dashboardData});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const deleteBlogAdmin = async (req, res) => {
    try{
        const{blogId} = req.params;
        await Blog.findByIdAndDelete(blogId);
        res.json({success: true, message: "Blog deleted successfully"});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const deleteCommentAdmin = async (req, res) => {
    try{
        const{commentId} = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.json({success: true, message: "Comment deleted successfully"});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const approveCommentAdmin = async (req, res) => {
    try{
        const{commentId} = req.params;
        await Comment.findByIdAndUpdate(commentId, {isApproved: true});
        res.json({success: true, message: "Comment approved successfully"});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

const getAdminAccounts = async (req, res) => {
    try {
        // Return admin accounts without passwords for security
        const adminList = ADMIN_ACCOUNTS.map(admin => ({
            email: admin.email,
            name: admin.name,
            role: "admin"
        }));
        
        res.json({
            success: true, 
            adminAccounts: adminList
        });
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

export {
    adminlogin, 
    getAllBlogsAdmin, 
    getAllCommentsAdmin, 
    getDashboardData, 
    deleteBlogAdmin, 
    deleteCommentAdmin, 
    approveCommentAdmin,
    getAdminAccounts
};

// Google Sign-In for Admins
const googleLogin = async (req, res) => {
    try {
        const { credential, idToken, token } = req.body || {};
        const googleIdToken = credential || idToken || token;

        if (!googleIdToken) {
            return res.json({ success: false, message: "Google credential (ID token) is required" });
        }

        // Support single or multiple client IDs (comma-separated)
        const audience = (process.env.GOOGLE_CLIENT_IDS
            ? process.env.GOOGLE_CLIENT_IDS.split(",").map(s => s.trim()).filter(Boolean)
            : (process.env.GOOGLE_CLIENT_ID ? [process.env.GOOGLE_CLIENT_ID] : undefined)) || undefined;

        const oauthClient = new OAuth2Client();
        const ticket = await oauthClient.verifyIdToken({ idToken: googleIdToken, audience });
        const payload = ticket.getPayload();

        const email = payload?.email;
        const emailVerified = payload?.email_verified;
        const name = payload?.name || "Admin";

        if (!email || !emailVerified) {
            return res.json({ success: false, message: "Email not verified with Google account" });
        }

        // Determine allowed admin emails
        const envAdmins = loadEnvAdminAccounts();
        const allowedEmails = (envAdmins.length > 0
            ? envAdmins.map(a => a.email.toLowerCase())
            : (process.env.NODE_ENV === 'production' ? [] : DUMMY_ADMIN_ACCOUNTS.map(a => a.email.toLowerCase())));

        const isAllowed = allowedEmails.includes(email.toLowerCase());
        if (!isAllowed) {
            return res.json({ success: false, message: "Access denied: email is not an authorized admin" });
        }

        const signedToken = jwt.sign({ 
            email,
            name,
            role: "admin",
            provider: "google"
        }, process.env.JWT_SECRET);

        return res.json({
            success: true,
            message: `Welcome back, ${name}!`,
            token: signedToken,
            admin: { name, email }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export { googleLogin };