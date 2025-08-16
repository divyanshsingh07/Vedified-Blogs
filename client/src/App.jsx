import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import { Routes, Route } from 'react-router-dom'

import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import BlogList from './pages/admin/BlogList'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:id' element={<Blog />} />
        <Route path='admin' element={true ? <Layout />:<Login/>}>
          <Route index element={<Dashboard />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='comments' element={<Comments />} />
        </Route>


    </Routes>

    </div>
  )
}

export default App
