import { 
    adminlogin, 
    getAllCommentsAdmin, 
    getDashboardData, 
    deleteBlogAdmin, 
    deleteCommentAdmin, 
    approveCommentAdmin,
    getAdminAccounts
} from "../controlers/admincontrole.js";
import express from "express";

const adminRout = express.Router();

adminRout.post("/login", adminlogin);
adminRout.get("/admin-accounts", getAdminAccounts);
adminRout.get("/comments", getAllCommentsAdmin);
adminRout.get("/dashboard", getDashboardData);
adminRout.delete("/blog/:blogId", deleteBlogAdmin);
adminRout.post("/deleteComment/:commentId", deleteCommentAdmin);
adminRout.post("/approveComment/:commentId", approveCommentAdmin);

export default adminRout;

