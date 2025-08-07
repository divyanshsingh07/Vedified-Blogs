import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import { Routes, Route } from 'react-router-dom'
import Admin from './components/admin'

const App = () => {
  return (
    <div>
    <Routes>
        <Route index element={<Home />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:id' element={<Blog />} />
         <Route path='admin' element={<Admin />} />

    </Routes>

    </div>
  )
}

export default App
