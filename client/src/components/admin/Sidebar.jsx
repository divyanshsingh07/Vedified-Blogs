import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-48 lg:w-64'} bg-white shadow-lg border-r border-gray-200 h-full transition-all duration-300 ease-in-out relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4 lg:p-6'}`}>
        {/* Sidebar Header */}
        <div className={`${isCollapsed ? 'mb-4' : 'mb-6 lg:mb-8'}`}>
          <div className="flex items-center justify-center">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className={`${isCollapsed ? 'w-8 h-8' : 'w-10 h-10 lg:w-12 lg:h-12'} transition-all duration-300`}
            />
            {!isCollapsed && (
              <span className="ml-2 text-lg lg:text-xl font-bold text-gray-900 truncate">Admin</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className={`${isCollapsed ? 'space-y-2' : 'space-y-1 lg:space-y-2'}`}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 lg:gap-3'} px-2 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 11h0" />
            </svg>
            {!isCollapsed && <span className="font-medium text-sm lg:text-base">Dashboard</span>}
          </NavLink>

          <NavLink
            to="/admin/add-blog"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 lg:gap-3'} px-2 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <img src={assets.add_icon} alt="add blog" className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm lg:text-base">Add Blog</span>}
          </NavLink>

          <NavLink
            to="/admin/blog-list"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 lg:gap-3'} px-2 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <img src={assets.list_icon} alt="blog list" className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm lg:text-base">Blog List</span>}
          </NavLink>

          <NavLink
            to="/admin/comments"
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'gap-2 lg:gap-3'} px-2 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <img src={assets.comment_icon} alt="comments" className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm lg:text-base">Comments</span>}
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        {!isCollapsed && (
          <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-2">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={assets.user_icon} alt="user" className="w-3 h-3 lg:w-4 lg:h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@blog.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
