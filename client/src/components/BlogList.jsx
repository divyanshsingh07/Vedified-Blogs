import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion, LayoutGroup } from "framer-motion"
import BlogCard from './BlogCard';
import { useAppContext } from '../contexts/AppContext';

function BlogList() {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = blogs.filter(blog => {
    if (input == '') {
      return blog;
    }
    else {
      return blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase());
    }
  })


  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      {/* Category Menu */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 my-6 sm:my-8 lg:my-10 xl:my-12 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg rounded-full z-10 transition-all duration-200 font-medium whitespace-nowrap ${
                menu === item ? "text-white" : "text-gray-800 hover:text-hover-primary"
              }`}
            >
              {item}
            </button>

            {menu === item && (
              <motion.div 
                layoutId='underline'
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute inset-0 bg-primary -z-10 rounded-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-16 sm:mb-20 lg:mb-24 xl:mb-28">
        {filteredBlogs
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
}


export default BlogList
