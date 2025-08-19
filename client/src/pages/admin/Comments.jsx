import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Comments = () => {
  const { axios } = useAppContext()
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Fetch comments from backend
  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/api/admin/comments')
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message || 'Failed to fetch comments')
      }
    } catch (error) {
      console.error('Fetch comments error:', error)
      toast.error('Failed to fetch comments. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true
    if (filter === 'approved') return comment.isApproved === true
    if (filter === 'pending') return comment.isApproved === false
    return true
  })

  const handleApprove = async (commentId) => {
    try {
      const { data } = await axios.post(`/api/admin/approveComment/${commentId}`)
      if (data.success) {
        // Update local state
        setComments(comments.map(comment => 
          comment._id === commentId 
            ? { ...comment, isApproved: true }
            : comment
        ))
        toast.success('Comment approved successfully!')
      } else {
        toast.error(data.message || 'Failed to approve comment')
      }
    } catch (error) {
      console.error('Approve comment error:', error)
      toast.error('Failed to approve comment. Please try again.')
    }
  }

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      try {
        const { data } = await axios.post(`/api/admin/deleteComment/${commentId}`)
        if (data.success) {
          // Remove comment from local state
          setComments(comments.filter(comment => comment._id !== commentId))
          toast.success('Comment deleted successfully!')
        } else {
          toast.error(data.message || 'Failed to delete comment')
        }
      } catch (error) {
        console.error('Delete comment error:', error)
        toast.error('Failed to delete comment. Please try again.')
      }
    }
  }

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

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Comments Management</h1>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Total: {comments.length}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Approved: {comments.filter(c => c.isApproved === true).length}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Pending: {comments.filter(c => c.isApproved === false).length}
            </span>
          </div>
          <button
            onClick={fetchComments}
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-hover-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
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
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
    <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="all">All Comments</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading comments...</div>
          ) : filteredComments.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No comments found matching your filter.</div>
          ) : (
            filteredComments.map((comment, index) => (
              <div key={comment._id} className="p-4 sm:p-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      comment.isApproved === true
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                      {comment.isApproved === true ? (
                        <>
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Approved
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Pending
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-900 mb-2">{comment.content}</p>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="font-medium mr-2">By: {comment.name}</span>
                    <span>•</span>
                    <span className="ml-2">{comment.blog?.title || 'Unknown Blog'}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!comment.isApproved && (
                    <button 
                      onClick={() => handleApprove(comment._id)}
                                                  className="flex-1 text-green-600 hover:text-hover-primary bg-green-100 hover:bg-hover-primary/20 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(comment._id)}
                                                className="flex-1 text-red-600 hover:text-hover-primary bg-red-100 hover:bg-hover-primary/20 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Loading comments...
                    </div>
                  </td>
                </tr>
              ) : filteredComments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                    No comments found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredComments.map((comment, index) => (
                  <tr key={comment._id} className="hover:bg-hover-primary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="max-w-[300px]">
                        <p className="text-sm text-gray-900 truncate">{comment.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(comment.createdAt)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={comment.blog?.image || assets.dummy} 
                          alt={comment.blog?.title || 'Unknown Blog'} 
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {comment.blog?.title || 'Unknown Blog'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        comment.isApproved === true
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {comment.isApproved === true ? (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Approved
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {!comment.isApproved && (
                          <button 
                            onClick={() => handleApprove(comment._id)}
                            className="text-green-600 hover:text-hover-primary bg-green-100 hover:bg-hover-primary/20 px-3 py-1 rounded-md text-xs transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Approve
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(comment._id)}
                                                      className="text-red-600 hover:text-hover-primary bg-red-100 hover:bg-hover-primary/20 px-3 py-1 rounded-md text-xs transition-colors flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
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

export default Comments
