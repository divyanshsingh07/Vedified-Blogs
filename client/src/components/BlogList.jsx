import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion, LayoutGroup } from "framer-motion"
import BlogCard from './BlogCard';
function BlogList() {
  const [menu, setMenu] = useState("All");

  return (
    <div>
      
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer px-4 py-1 text-sm rounded-full z-10 transition-all duration-200 ${
                menu === item ? "text-white" : "text-gray-800"
              }`}
            >
              {item}
            </button>

          
            {menu === item && (
              <motion.div layoutId='underline' 
              transition={{type:'spring' , stiffness: 500 , damping: 30}}
              className="absolute inset-0 bg-primary -z-10 rounded-4xl text-gray-50"></motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Blog Cards Section (you can map blog data here) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-16 sm:mx-40 xl:mx-40">
        {blog_data
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
}


export default BlogList
