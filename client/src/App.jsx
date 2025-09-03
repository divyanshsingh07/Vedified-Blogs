import React, { useEffect } from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import { Routes, Route } from 'react-router-dom'
import { AppProvider, useAppContext } from './contexts/AppContext'

import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import BlogList from './pages/admin/BlogList'
import Comments from './pages/admin/Comments'
import AdminAccounts from './components/admin/AdminAccounts'
import Login from './components/admin/Login'
import WriterLogin from './components/user/WriterLogin'
import WriterDashboard from './pages/writer/WriterDashboard'
import {Toaster} from 'react-hot-toast'

const AppRoutes = () => {
  const { token } = useAppContext();
  
  return (
    <div>
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:id' element={<Blog />} />
        
        {/* Writer Routes */}
        <Route path='writer-login' element={<WriterLogin />} />
        <Route path='writer' element={token ? <WriterDashboard /> : <WriterLogin />} />
        
        {/* Admin Routes */}
        <Route 
          path='admin' 
          element={
            token ? (
              <Layout />
            ) : (
              <Login />
            )
          }
        >
          <Route index element={token ? <Dashboard /> : <Login />} />
          <Route path='add-blog' element={token ? <AddBlog /> : <Login />} />
          <Route path='blog-list' element={token ? <BlogList /> : <Login />} />
          <Route path='comments' element={token ? <Comments /> : <Login />} />
          <Route path='admin-accounts' element={token ? <AdminAccounts /> : <Login />} />
        </Route>
      </Routes>
    </div>
  )
}

const App = () => {
  // Add smooth scroll behavior globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
