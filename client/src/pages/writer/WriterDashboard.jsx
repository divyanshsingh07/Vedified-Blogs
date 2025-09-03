import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const WriterDashboard = () => {
  const { axios } = useAppContext()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({
    recentBlogs: [],
    blogCount: 0,
    commentCount: 0,
    draftBlogs: 0
  })
  const [loading, setLoading] = useState(true)

  // Fetch dashboard data from backend
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/user/dashboard')
      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message || 'Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Fetch dashboard error:', error)
      toast.error('Failed to fetch dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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

  // Handle status toggle
  const handleToggleStatus = async (blogId) => {
    try {
      const { data } = await axios.post(`/api/blog/${blogId}/togglePublish`)
      if (data.success) {
        // Update local state
        setDashboardData(prev => ({
          ...prev,
          recentBlogs: prev.recentBlogs.map(blog => 
            blog._id === blogId 
              ? { ...blog, isPublished: data.data.isPublished }
              : blog
          ),
          blogCount: prev.blogCount,
          commentCount: prev.commentCount,
          draftBlogs: data.data.isPublished ? prev.draftBlogs - 1 : prev.draftBlogs + 1
        }))
        toast.success(`Blog ${data.data.isPublished ? 'published' : 'unpublished'} successfully!`)
      } else {
        toast.error(data.message || 'Failed to update blog status')
      }
    } catch (error) {
      console.error('Toggle status error:', error)
      toast.error('Failed to update blog status. Please try again.')
    }
  }

  // Handle delete blog
  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const { data } = await axios.delete(`/api/blog/${blogId}`)
        if (data.success) {
          // Update local state
          const deletedBlog = dashboardData.recentBlogs.find(blog => blog._id === blogId)
          setDashboardData(prev => ({
            ...prev,
            recentBlogs: prev.recentBlogs.filter(blog => blog._id !== blogId),
            blogCount: prev.blogCount - 1,
            draftBlogs: deletedBlog?.isPublished ? prev.draftBlogs : prev.draftBlogs - 1
          }))
          toast.success('Blog deleted successfully!')
        } else {
          toast.error(data.message || 'Failed to delete blog')
        }
      } catch (error) {
        console.error('Delete blog error:', error)
        toast.error('Failed to delete blog. Please try again.')
      }
    }
  }

  // Navigation functions for stats cards
  const navigateToAddBlog = () => {
    navigate('/writer/add-blog')
  }

  const navigateToBlogs = () => {
    navigate('/writer/blog-list')
  }

  const navigateToDrafts = () => {
    navigate('/writer/blog-list?filter=draft')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Writer Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your blogs and track your progress</p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Refreshing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Blogs Card */}
          <div 
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-hover-primary transition-all duration-200 group"
            onClick={navigateToBlogs}
          >
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg group-hover:bg-hover-primary/20 transition-colors">
                <img src={assets.tick_icon} alt="blogs" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-hover-primary transition-colors">{dashboardData.blogCount}</p>
                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-hover-primary transition-colors">Total Blogs</p>
                  </>
                )}
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Published Blogs Card */}
          <div 
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-hover-primary transition-all duration-200 group"
            onClick={navigateToBlogs}
          >
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg group-hover:bg-hover-primary/20 transition-colors">
                <img src={assets.tick_icon} alt="published" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-hover-primary transition-colors">{dashboardData.blogCount - dashboardData.draftBlogs}</p>
                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-hover-primary transition-colors">Published</p>
                  </>
                )}
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Draft Blogs Card */}
          <div 
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-hover-primary transition-all duration-200 group"
            onClick={navigateToDrafts}
          >
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg group-hover:bg-hover-primary/20 transition-colors">
                <img src={assets.add_icon} alt="drafts" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-hover-primary transition-colors">{dashboardData.draftBlogs}</p>
                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-hover-primary transition-colors">Drafts</p>
                  </>
                )}
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Total Comments Card */}
          <div 
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-hover-primary transition-all duration-200 group"
          >
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg group-hover:bg-hover-primary/20 transition-colors">
                <img src={assets.comment_icon} alt="comments" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="ml-3 sm:ml-4">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-hover-primary transition-colors">{dashboardData.commentCount}</p>
                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-hover-primary transition-colors">Comments</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={navigateToAddBlog}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-hover-primary transition-colors flex items-center gap-2"
            >
              <img src={assets.add_icon} alt="add" className="w-5 h-5" />
              Create New Blog
            </button>
            <button
              onClick={navigateToBlogs}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <img src={assets.list_icon} alt="list" className="w-5 h-5" />
              View All Blogs
            </button>
            <button
              onClick={navigateToDrafts}
              className="bg-yellow-100 text-yellow-700 px-6 py-3 rounded-lg hover:bg-yellow-200 transition-colors flex items-center gap-2"
            >
              <img src={assets.add_icon} alt="drafts" className="w-5 h-5" />
              View Drafts
            </button>
          </div>
        </div>

        {/* Recent Blogs Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-1 h-4 sm:h-6 bg-primary rounded-full mr-2 sm:mr-3"></div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Your Recent Blogs</h2>
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Loading...
                </div>
              )}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading blogs...</div>
            ) : dashboardData.recentBlogs.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No blogs found.</p>
                <button
                  onClick={navigateToAddBlog}
                  className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover-primary transition-colors"
                >
                  Create Your First Blog
                </button>
              </div>
            ) : (
              dashboardData.recentBlogs.map((blog, index) => (
                <div key={blog._id} className="p-3 sm:p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium mr-3">
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
                    <button 
                      className="flex-1 text-gray-600 hover:text-hover-primary bg-gray-100 hover:bg-hover-primary/20 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                      onClick={() => handleToggleStatus(blog._id)}
                    >
                      {blog.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      className="text-gray-600 hover:text-hover-primary bg-gray-100 hover:bg-hover-primary/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <img src={assets.bin_icon} alt="delete" className="w-4 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">Loading blogs...</td>
                  </tr>
                ) : dashboardData.recentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                      <div>
                        <p>No blogs found.</p>
                        <button
                          onClick={navigateToAddBlog}
                          className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-hover-primary transition-colors"
                        >
                          Create Your First Blog
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  dashboardData.recentBlogs.map((blog, index) => (
                    <tr key={blog._id} className="hover:bg-hover-primary/10">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          className="text-gray-600 hover:text-hover-primary bg-gray-100 hover:bg-hover-primary/20 px-3 py-1 rounded-md text-xs transition-colors"
                          onClick={() => handleToggleStatus(blog._id)}
                        >
                          {blog.isPublished ? 'Unpublish' : 'Publish'}
                        </button>
                        <button 
                          className="text-gray-600 hover:text-hover-primary bg-gray-100 hover:bg-hover-primary/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <img src={assets.bin_icon} alt="delete" className="w-4 h-5 cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriterDashboard
