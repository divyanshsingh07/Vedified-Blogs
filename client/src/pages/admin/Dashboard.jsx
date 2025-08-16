import React from 'react'
import { assets, blog_data, comments_data } from '../../assets/assets'

const Dashboard = () => {
  // Calculate stats
  const totalBlogs = blog_data.length
  const totalComments = comments_data.length
  const totalDrafts = blog_data.filter(blog => !blog.isPublished).length
  const recentBlogs = blog_data.slice(0, 10) // Get latest 6 blogs

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const year = date.getFullYear()
    
    // Add ordinal suffix to day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'
      switch (day % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    }
    
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`
  }

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 overflow-x-hidden">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Blogs Card */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <img src={assets.tick_icon} alt="blogs" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalBlogs}</p>
              <p className="text-sm sm:text-base text-gray-600">Blogs</p>
            </div>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <img src={assets.comment_icon} alt="comments" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalComments}</p>
              <p className="text-sm sm:text-base text-gray-600">Comments</p>
            </div>
          </div>
        </div>

        {/* Total Drafts Card */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
              <img src={assets.add_icon} alt="drafts" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalDrafts}</p>
              <p className="text-sm sm:text-base text-gray-600">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-1 h-4 sm:h-6 bg-blue-600 rounded-full mr-2 sm:mr-3"></div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Latest Blogs</h2>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {recentBlogs.map((blog, index) => (
            <div key={blog._id} className="p-3 sm:p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    blog.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {formatDate(blog.createdAt)}
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900 mb-2">{blog.title}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-xs font-medium transition-colors">
                  {blog.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button className="text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <img src={assets.bin_icon} alt="delete" className="w-4 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBlogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="max-w-[300px]">
                      <p className="truncate">{blog.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      blog.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className=" cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-xs transition-colors">
                      {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                      <img src={assets.bin_icon} alt="delete" className="w-4 h-5 cursor-pointer" onClick={() => handleDelete(blog._id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
