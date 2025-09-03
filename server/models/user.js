import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: false },
    photoURL: { type: String, required: false }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;


