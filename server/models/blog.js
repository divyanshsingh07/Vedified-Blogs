import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: false},
    description: {type: String, required: false},
    category: {type: String, required: false},
    image: { 
        type: String, 
        required: function () { 
            return this.isPublished === true; 
        }
    },
   isPublished: {type: Boolean, default: false},
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;