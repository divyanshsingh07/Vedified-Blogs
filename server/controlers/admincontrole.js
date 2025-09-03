import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";
import { OAuth2Client } from "google-auth-library";
import firebaseAdmin from "../configs/firebaseAdmin.js";

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

// Previously: we restricted admin access by whitelist. Now we allow any Google-authenticated
// user to access their own admin dashboard. Data remains scoped by their email.
const GOOGLE_ADMIN_EMAILS = [];

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

// Google Login
const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!process.env.GOOGLE_CLIENT_ID) {
            return res.json({ success: false, message: "Missing GOOGLE_CLIENT_ID on server" });
        }
        if (!idToken) {
            return res.json({ success: false, message: "Google idToken is required" });
        }

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const email = payload?.email;
        const name = payload?.name || "Admin";

        if (!email) {
            return res.json({ success: false, message: "Google account has no email" });
        }

        // Issue admin token for any Google-authenticated user.
        const token = jwt.sign({ email, name, role: "admin" }, process.env.JWT_SECRET);
        return res.json({ success: true, message: `Welcome, ${name}`, token, admin: { name, email } });
    } catch (error) {
        console.error("Google login error:", error);
        return res.json({ success: false, message: error.message || "Google authentication failed" });
    }
}

// Firebase Login: verify ID token from client (Google/email-password)
const firebaseLogin = async (req, res) => {
    try {
        const { idToken } = req.body; // Firebase Auth ID token
        console.log('🔥 Firebase login attempt received');
        
        if (!idToken) {
            console.log('❌ No idToken provided');
            return res.json({ success: false, message: "Firebase idToken is required" });
        }

        // For local development, we'll decode the JWT manually since Firebase Admin isn't configured
        let email, name;
        
        if (firebaseAdmin?.auth) {
            // Production: Use Firebase Admin SDK
            console.log('🔍 Verifying Firebase token with Admin SDK...');
            const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
            email = decoded.email;
            name = decoded.name || decoded.email || "Admin";
        } else {
            // Local development: Decode JWT manually (less secure but works for testing)
            console.log('⚠️ Firebase Admin not configured, decoding JWT manually for local dev...');
            try {
                // Decode the JWT payload (this is not secure for production!)
                const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
                email = payload.email;
                name = payload.name || payload.email || "Admin";
                console.log('👤 Decoded user from JWT:', { email, name });
            } catch (jwtError) {
                console.error('❌ Failed to decode JWT:', jwtError.message);
                return res.json({ success: false, message: "Invalid Firebase token" });
            }
        }

        if (!email) {
            console.log('❌ No email in token');
            return res.json({ success: false, message: "Token missing email" });
        }

        // Allow any Google/Firebase-authenticated email to receive an admin JWT.
        console.log('✅ Google user authenticated, generating admin JWT...');
        const token = jwt.sign({ email, name, role: "admin" }, process.env.JWT_SECRET);
        console.log('🎫 JWT generated successfully');
        
        return res.json({ success: true, message: `Welcome, ${name}`, token, admin: { name, email } });
    } catch (error) {
        console.error("❌ Firebase login error:", error);
        return res.json({ success: false, message: error.message || "Firebase authentication failed" });
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
       // Scope to current user if available; fallback to global for legacy tokens
       const authorFilter = req.user?.email ? { authorEmail: req.user.email } : {};

        const recentBlogs = await Blog.find(authorFilter).sort({createdAt: -1}).limit(5);
        const blogCount = await Blog.countDocuments(authorFilter);
        const draftBlogs = await Blog.countDocuments({ ...authorFilter, isPublished: false });

        // Count comments on the user's blogs only
        const authorBlogs = await Blog.find(authorFilter).select('_id');
        const blogIds = authorBlogs.map(b => b._id);
        const commentCount = blogIds.length > 0 
            ? await Comment.countDocuments({ blog: { $in: blogIds } })
            : 0;

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

const deleteAdminAccount = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }
        
        // Find the admin account index
        const adminIndex = ADMIN_ACCOUNTS.findIndex(admin => admin.email === email);
        
        if (adminIndex === -1) {
            return res.json({ success: false, message: "Admin account not found" });
        }
        
        // Check if it's a dummy account (can be deleted)
        const isDummyAccount = DUMMY_ADMIN_ACCOUNTS.some(dummy => dummy.email === email);
        
        if (!isDummyAccount) {
            return res.json({ 
                success: false, 
                message: "Cannot delete environment-configured admin accounts. Remove them from environment variables instead." 
            });
        }
        
        // Remove from dummy accounts
        DUMMY_ADMIN_ACCOUNTS.splice(adminIndex, 1);
        
        res.json({
            success: true,
            message: `Admin account ${email} deleted successfully`
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
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
    getAdminAccounts,
    deleteAdminAccount,
    googleLogin,
    firebaseLogin
};