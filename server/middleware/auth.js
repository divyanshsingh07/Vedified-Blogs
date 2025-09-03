import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        // Support formats: "Bearer <token>" or raw token
        const token = header.startsWith("Bearer ") ? header.slice(7) : header;
        if (!token) {
            return res.json({ success: false, message: "Authorization token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user info to request for downstream handlers
        req.user = {
            email: decoded.email,
            name: decoded.name,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid token" });
    }
}
export default auth;    
