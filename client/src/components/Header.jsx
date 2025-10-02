import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../contexts/AppContext'
import { motion } from 'framer-motion'

function Header() {
  const { setInput, navigate, token } = useAppContext();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setInput(searchValue);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setInput(e.target.value);
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-32 relative">
      {/* Background Accent (subtle) */}
      <img
        src={assets.gradientBackground}
        alt="bg"
        className="absolute -top-[35%] opacity-20 -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mt-16 mb-10"
      >
        <div className="inline-flex items-center justify-center border rounded-full px-5 py-1.5 gap-2 text-xs sm:text-sm font-medium text-slate-700 border-slate-200 bg-white/70 backdrop-blur shadow-sm">
          <img src={assets.star_icon} alt="spark" className="w-3.5 h-3.5" />
          <p className="">Write your blog with AI assistance</p>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight py-6 text-slate-900">
          Your own{" "}
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
            blogging
          </span>{" "}
          platform
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg font-medium">
          Create, publish, and grow your audience with elegant tooling and
          AI-powered writing.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(token ? "/admin" : "/admin")}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-[0_0_28px_rgba(236,72,153,0.45)] hover:scale-[1.03] active:scale-100 transition-all"
          >
            Start Writing
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 sm:px-6 py-2.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur text-slate-700 font-semibold hover:border-pink-400 hover:text-pink-500 hover:shadow-md hover:scale-[1.02] active:scale-100 transition-all"
          >
            Explore Blogs
          </button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center max-w-2xl mx-auto border border-slate-200 bg-white/90 backdrop-blur rounded-full overflow-hidden shadow-sm"
      >
        <div className="pl-4 text-slate-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for blogs"
          value={searchValue}
          onChange={handleInputChange}
          required
          className="flex-1 pl-3 pr-3 py-3 outline-none bg-transparent text-slate-700 placeholder-slate-400"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 text-white px-6 py-3 m-1.5 rounded-full hover:shadow-[0_0_22px_rgba(236,72,153,0.45)] hover:scale-[1.03] transition-all cursor-pointer"
        >
          Search
        </button>
      </motion.form>
    </div>
  )
}

export default Header