import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AdminAccounts from '../../components/admin/AdminAccounts'

const Dashboard = () => {
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
      const { data } = await axios.get('/api/admin/dashboard')
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
  const navigateToBlogs = () => {
    navigate('/admin/blog-list')
  }

  const navigateToComments = () => {
    navigate('/admin/comments')
  }

  const navigateToDrafts = () => {
    navigate('/admin/blog-list?filter=draft')
  }

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 overflow-x-hidden">
      {/* Header with Refresh Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Blogs Card */}
        <div 
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
          onClick={navigateToBlogs}
        >
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
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
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{dashboardData.blogCount}</p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-500 transition-colors">Blogs</p>
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

        {/* Total Comments Card */}
        <div 
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-green-300 transition-all duration-200 group"
          onClick={navigateToComments}
        >
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
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
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{dashboardData.commentCount}</p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-green-500 transition-colors">Comments</p>
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

        {/* Total Drafts Card */}
        <div 
          className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-yellow-300 transition-all duration-200 group sm:col-span-2 lg:col-span-1"
          onClick={navigateToDrafts}
        >
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
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
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{dashboardData.draftBlogs}</p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-yellow-500 transition-colors">Drafts</p>
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
      </div>

      {/* Admin Accounts Section */}
      <div className="mb-6 sm:mb-8">
        <AdminAccounts />
      </div>

      {/* Latest Blogs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-1 h-4 sm:h-6 bg-blue-600 rounded-full mr-2 sm:mr-3"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Latest Blogs</h2>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
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
            <div className="p-4 text-center text-gray-500">No recent blogs found.</div>
          ) : (
            dashboardData.recentBlogs.map((blog, index) => (
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
                  <button 
                    className="flex-1 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                    onClick={() => handleToggleStatus(blog._id)}
                  >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <button 
                    className="text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
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
                  <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">No recent blogs found.</td>
                </tr>
              ) : (
                dashboardData.recentBlogs.map((blog, index) => (
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
                      <button 
                        className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-xs transition-colors"
                        onClick={() => handleToggleStatus(blog._id)}
                      >
                        {blog.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                      <button 
                        className="text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
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
  )
}

export default Dashboard
