import { 
    adminlogin, 
    getAllCommentsAdmin, 
    getDashboardData, 
    deleteBlogAdmin, 
    deleteCommentAdmin, 
    approveCommentAdmin,
    getAdminAccounts,
    deleteAdminAccount,
    googleLogin,
    firebaseLogin
} from "../controlers/admincontrole.js";
import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

const adminRout = express.Router();

// Debug: Log route registration
console.log('🔧 Registering admin routes...');

adminRout.post("/login", adminlogin);
adminRout.post("/google-login", googleLogin);
adminRout.post("/firebase-login", firebaseLogin);

console.log('✅ Admin routes registered, including firebase-login');
adminRout.get("/admin-accounts", getAdminAccounts);
adminRout.delete("/admin-account", deleteAdminAccount);
adminRout.get("/comments", getAllCommentsAdmin);
adminRout.get("/dashboard", auth, getDashboardData);
adminRout.delete("/blog/:blogId", deleteBlogAdmin);
adminRout.post("/deleteComment/:commentId", deleteCommentAdmin);
adminRout.post("/approveComment/:commentId", approveCommentAdmin);

export default adminRout;

// ==== USER (WRITER) AUTH AND DASHBOARD ====
export const userRout = express.Router();

// POST /api/auth/firebase-user-login
userRout.post("/auth/firebase-user-login", async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) {
            return res.json({ success: false, message: "Firebase idToken is required" });
        }

        let email, name, picture;
        if (admin?.auth) {
            const decoded = await admin.auth().verifyIdToken(idToken);
            email = decoded.email;
            name = decoded.name || decoded.email;
            picture = decoded.picture;
        } else {
            // local dev decode
            const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
            email = payload.email;
            name = payload.name || payload.email;
            picture = payload.picture;
        }

        if (!email) {
            return res.json({ success: false, message: "Token missing email" });
        }

        // Upsert user
        const user = await User.findOneAndUpdate(
            { email },
            { $set: { name, photoURL: picture } },
            { new: true, upsert: true }
        );

        const token = jwt.sign({ email, name, role: "user" }, process.env.JWT_SECRET);
        return res.json({ success: true, message: "Login successful", token, user: { email, name, photoURL: user.photoURL } });
    } catch (error) {
        console.error("user login error:", error);
        return res.json({ success: false, message: error.message || "User authentication failed" });
    }
});

// GET /api/user/dashboard
userRout.get("/user/dashboard", auth, async (req, res) => {
    try {
        if (req.user?.role !== 'user' && req.user?.role !== 'admin') {
            return res.json({ success: false, message: "Unauthorized" });
        }
        const authorEmail = req.user.email;

        const recentBlogs = await (await import('../models/blog.js')).default
            .find({ authorEmail })
            .sort({ createdAt: -1 })
            .limit(5);

        const blogCount = await (await import('../models/blog.js')).default
            .countDocuments({ authorEmail });

        const draftBlogs = await (await import('../models/blog.js')).default
            .countDocuments({ authorEmail, isPublished: false });

        const blogIds = (await (await import('../models/blog.js')).default
            .find({ authorEmail }).select('_id')).map(b => b._id);

        const commentCount = blogIds.length > 0 
            ? await (await import('../models/comments.js')).default.countDocuments({ blog: { $in: blogIds } })
            : 0;

        res.json({ success: true, dashboardData: { recentBlogs, blogCount, commentCount, draftBlogs } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

