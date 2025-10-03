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
        <h1 className="text-xl sm:text-2xl font-black text-black">Blog List</h1>
        <button className="mt-4 sm:mt-0 bg-black text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-bold uppercase tracking-wide border-2 border-black">
          Add New Blog
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg border-2 border-black">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search blogs by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base font-semibold"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base font-semibold"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-black overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-100">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">#</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Blog Title</th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Category</th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Date</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-black">
              {filteredBlogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-amber-100">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-bold text-black">{index + 1}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover mr-2 sm:mr-3 border-2 border-black"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-black truncate">{blog.title}</p>
                        <p className="text-xs text-gray-800 truncate hidden sm:block font-semibold">{blog.subTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-bold rounded-full bg-black text-white">
                      {blog.category}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${
                      blog.isPublished 
                        ? 'bg-green-100 text-green-800 border border-green-800' 
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-800'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button 
                        onClick={() => handleToggleStatus(blog._id)}
                        className="text-gray-800 hover:text-black bg-amber-100 hover:bg-amber-200 px-2 sm:px-3 py-1 rounded-md text-xs transition-colors font-bold border border-black"
                      >
                        {blog.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="text-black hover:text-gray-800 bg-white hover:bg-amber-100 px-2 sm:px-3 py-1 rounded-md text-xs transition-colors font-bold border border-black">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-2 sm:px-3 py-1 rounded-md text-xs transition-colors font-bold border border-red-600"
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
            <p className="text-gray-800 text-sm sm:text-base font-semibold">No blogs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList
