import React, { useState } from 'react'
import { assets, comments_data } from '../../assets/assets'

const Comments = () => {
  const [comments, setComments] = useState(comments_data)
  const [filter, setFilter] = useState('all')

  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true
    if (filter === 'approved') return comment.isApproved
    if (filter === 'pending') return !comment.isApproved
    return true
  })

  const handleApprove = (commentId) => {
    setComments(comments.map(comment => 
      comment._id === commentId 
        ? { ...comment, isApproved: true }
        : comment
    ))
  }

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter(comment => comment._id !== commentId))
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
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <span className="text-sm text-gray-600">Total: {comments.length}</span>
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
          {filteredComments.map((comment, index) => (
            <div key={comment._id} className="p-4 sm:p-6 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                    {index + 1}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    comment.isApproved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {comment.isApproved ? 'Approved' : 'Pending'}
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
                  <span className="ml-2">{comment.blog.title}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {!comment.isApproved && (
                  <button 
                    onClick={() => handleApprove(comment._id)}
                    className="flex-1 text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(comment._id)}
                  className="flex-1 text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                >
                  Delete
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComments.map((comment, index) => (
                <tr key={comment._id} className="hover:bg-gray-50">
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
                        src={comment.blog.image} 
                        alt={comment.blog.title} 
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{comment.blog.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {comment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      comment.isApproved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {comment.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {!comment.isApproved && (
                        <button 
                          onClick={() => handleApprove(comment._id)}
                          className="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-md text-xs transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md text-xs transition-colors"
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
        {filteredComments.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-base">No comments found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
