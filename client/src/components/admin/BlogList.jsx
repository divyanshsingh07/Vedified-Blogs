import React, { useState } from 'react'
import { assets, blog_data } from '../../assets/assets'

const BlogList = () => {
  const [blogs, setBlogs] = useState(blog_data)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Filter blogs based on search and status
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'published' && blog.isPublished) ||
                         (statusFilter === 'draft' && !blog.isPublished)
    
    return matchesSearch && matchesStatus
  })

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const year = date.getFullYear()
    
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

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog._id !== blogId))
    }
  }

  const handleToggleStatus = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog._id === blogId 
        ? { ...blog, isPublished: !blog.isPublished }
        : blog
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Blog List</h1>
        <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
          Add New Blog
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search blogs by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Title</th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover mr-2 sm:mr-3"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{blog.title}</p>
                        <p className="text-xs text-gray-500 truncate hidden sm:block">{blog.subTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      blog.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button 
                        onClick={() => handleToggleStatus(blog._id)}
                        className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-1 rounded-md text-xs transition-colors"
                      >
                        {blog.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-2 sm:px-3 py-1 rounded-md text-xs transition-colors">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-2 sm:px-3 py-1 rounded-md text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-base">No blogs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList
