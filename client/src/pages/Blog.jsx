import React from 'react'
import { useParams } from 'react-router-dom'
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar'
import { blog_data } from '../assets/assets'

const Blog = () => {
  const { id } = useParams()

  if (id) {
    const blog = blog_data.find(blog => blog._id === id)
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
      )
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Blog Header */}
            <div className="mb-8">
              <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {blog.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center text-gray-600 text-sm">
                <span>Published on {new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
                             <div className='flex items-center justify-center bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit mx-auto'>userName</div>

            </div>

            {/* Blog Image */}
            <div className="mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Blog Content */}
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>

            {/* Comments-Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comments</h3>
              <div className="space-y-4">
                {/* Comment form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <textarea 
                    placeholder="Add a comment..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="3"
                  />
                  <button className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Post Comment
                  </button>
                </div>
                
                {/* Sample comments */}
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">John Doe</span>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700">Great article! Very informative and well-written.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">Jane Smith</span>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700">This really helped me understand the topic better. Thanks for sharing!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                ← Back to Blogs
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  }

  // If no ID, show the blog list
  return (
    <div>
      <Navbar />
      <BlogList />
    </div>
  )
}

export default Blog
