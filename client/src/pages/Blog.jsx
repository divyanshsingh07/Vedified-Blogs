import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar'
import { useAppContext } from '../contexts/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
  const { id } = useParams()
  const { axios } = useAppContext();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState({ name: '', content: '' });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlog();
      fetchComments();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setBlog(data.data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch blog post');
      console.error('Fetch blog error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      // Fetch comments from backend
      const { data } = await axios.get(`/api/blog/${id}/comments`);
      if (data.success) {
        setComments(data.data || []);
      }
    } catch (error) {
      console.error('Fetch comments error:', error);
      // If endpoint doesn't exist yet, set empty array
      setComments([]);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.content.trim()) return;

    try {
      setSubmittingComment(true);
      
      // Send comment to backend database
      const { data } = await axios.post('/api/blog/addComment', {
        blog: id,
        name: commentForm.name.trim(),
        content: commentForm.content.trim()
      });

      if (data.success) {
        setCommentForm({ name: '', content: '' });
        setCommentSubmitted(true); // Show review message
        fetchComments(); // Refresh comments
        toast.success('Your comment is under review and will be visible after admin approval.');
        
        // Reset the submitted state after 5 seconds
        setTimeout(() => {
          setCommentSubmitted(false);
        }, 5000);
      } else {
        toast.error(data.message || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Add comment error:', error);
      toast.error('Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleCommentChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const { data } = await axios.delete(`/api/blog/comment/${commentId}`);
        if (data.success) {
          // Remove comment from local state
          setComments(prev => prev.filter(comment => comment._id !== commentId));
          toast.success('Comment deleted successfully!');
        } else {
          toast.error(data.message || 'Failed to delete comment');
        }
      } catch (error) {
        console.error('Delete comment error:', error);
        toast.error('Failed to delete comment. Please try again.');
      }
    }
  };

  // If no ID, show the blog list
  if (!id) {
    return (
      <div>
        <Navbar />
        <BlogList />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Blog</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Blog Header */}
          <div className="mb-6 sm:mb-8">
            <span className="inline-block bg-primary/20 text-primary px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {blog.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-3">
              <span>Published on {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className='flex items-center justify-center bg-primary/20 text-primary px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit mx-auto'>
              Admin
            </div>
          </div>

          {/* Blog Image */}
          <div className="mb-6 sm:mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Blog Content */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <div
              className="rich-text text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>

          {/* Comments-Section */}
          <div className="mt-8 w-full max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 px-2 sm:px-0">Comments ({comments.length})</h3>
            <div className="space-y-3 sm:space-y-4">
              {/* Comment Review Notice */}
              {commentSubmitted && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mx-2 sm:mx-0">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-blue-800">Comment Submitted!</p>
                      <p className="text-xs text-blue-600 mt-1">Your comment will be visible after admin approval.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Comment form */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mx-2 sm:mx-0">
                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={commentForm.name}
                    onChange={handleCommentChange}
                    className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    required
                    disabled={commentSubmitted}
                  />
                  <textarea 
                    name="content"
                    placeholder="Add a comment..."
                    value={commentForm.content}
                    onChange={handleCommentChange}
                    className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base resize-none"
                    rows="3"
                    required
                    disabled={commentSubmitted}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button 
                      type="submit"
                      disabled={submittingComment || commentSubmitted}
                      className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-hover-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                    >
                      {submittingComment ? 'Posting...' : commentSubmitted ? 'Comment Submitted!' : 'Post Comment'}
                    </button>
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                      Your comment will be visible after admin approval.
                    </p>
                  </div>
                </form>
              </div>
              
              {/* Real comments from backend */}
              <div className="space-y-2 sm:space-y-3 mx-2 sm:mx-0">
                {comments.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 bg-white rounded-lg border">
                    <p className="text-sm sm:text-base">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="bg-white p-3 sm:p-4 rounded-lg border">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{comment.name}</span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{comment.content}</p>
                      <div className="flex items-center justify-end mt-3">
                        <button 
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-hover-primary hover:bg-hover-primary/10 p-1.5 sm:p-1 rounded transition-colors duration-200"
                          title="Delete comment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 sm:mt-8 px-2 sm:px-0">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-hover-primary transition-colors text-sm sm:text-base font-medium"
            >
              ← Back to Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
