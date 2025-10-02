import React, { useMemo, useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion, LayoutGroup } from "framer-motion"
import BlogCard from './BlogCard';
import { useAppContext } from '../contexts/AppContext';

function BlogList() {
  const [menu, setMenu] = useState("All");
  const [sortBy, setSortBy] = useState('Newest');
  const { blogs, input } = useAppContext();

  const filteredBlogs = blogs.filter(blog => {
    if (input == '') {
      return blog;
    }
    else {
      return blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase());
    }
  })


  const categoryIcon = (cat) => {
    switch (cat) {
      case 'Technology':
        return (
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L8 15.25m8 0L14.25 17M4 7h16M8 7l-4 10h16L16 7' />
          </svg>
        );
      case 'Startup':
        return (
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        );
      case 'Finance':
        return (
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-3 0-5 1.5-5 4s2 4 5 4 5-1.5 5-4-2-4-5-4zm0-5v5m0 8v5' />
          </svg>
        );
      case 'Lifestyle':
        return (
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6l4 2' />
          </svg>
        );
      default:
        return (
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7h18M3 12h18M3 17h18' />
          </svg>
        );
    }
  };

  const sortedBlogs = useMemo(() => {
    const list = [...filteredBlogs];
    if (sortBy === 'Newest') {
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === 'Oldest') {
      return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    // Popular (fallback): sort by description length as a proxy
    return list.sort((a, b) => (b?.description?.length || 0) - (a?.description?.length || 0));
  }, [filteredBlogs, sortBy]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      {/* Controls: Categories + Sorting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-8">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {blogCategories.map((item) => (
            <button
              key={item}
              onClick={() => setMenu(item)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${menu === item ? 'border-transparent text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md' : 'border-slate-200 text-slate-700 bg-white/60 backdrop-blur'} transition-all hover:shadow hover:scale-[1.02]`}
            >
              <span className='text-slate-600'>{categoryIcon(item)}</span>
              <span className='text-sm font-medium'>{item}</span>
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='appearance-none text-sm font-medium rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200'
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Popular</option>
          </select>
          <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
            </svg>
          </span>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-16 sm:mb-20 lg:mb-24 xl:mb-28">
        {sortedBlogs
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
}


export default BlogList
