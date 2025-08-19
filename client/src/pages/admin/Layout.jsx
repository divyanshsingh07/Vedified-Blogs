import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { assets } from '../../assets/assets';
import Sidebar from '../../components/admin/Sidebar';
import toast from 'react-hot-toast';
import axios from 'axios';

const Layout = () => {
  const navigate = useNavigate();
  const { setToken, setBlogs, setInput, token } = useAppContext();
  const [adminInfo, setAdminInfo] = useState(null);

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Get admin info from token
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAdminInfo({
          name: payload.name || 'Admin',
          email: payload.email || 'admin@vedified.com'
        });
      } catch (error) {
        console.error('Error parsing token:', error);
        setAdminInfo({
          name: 'Admin',
          email: 'admin@vedified.com'
        });
      }
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('adminToken');
      
      // Clear context state
      setToken(null);
      setBlogs([]);
      setInput('');
      setAdminInfo(null);
      
      // Clear axios authorization header
      delete axios.defaults.headers.common['Authorization'];
      
      // Show success message
      toast.success('Logged out successfully');
      
      // Navigate to home
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* Navbar - Same as regular Navbar but with Logout */}
      <div className='flex justify-between items-center py-4 sm:py-5 px-4 sm:px-8 lg:px-20 xl:px-32 bg-white border-b border-gray-200'>
        <div className='flex items-center gap-4'>
          <img 
            onClick={handleLogoClick} 
            src={assets.logo} 
            alt='logo' 
            className='w-24 sm:w-32 lg:w-44 cursor-pointer hover:opacity-80 transition-opacity' 
          />
          {adminInfo && (
            <div className='hidden sm:block'>
              <p className='text-sm text-gray-600'>Welcome back,</p>
              <p className='text-lg font-semibold text-gray-800'>{adminInfo.name}</p>
            </div>
          )}
        </div>
        <button 
          onClick={handleLogout} 
          className='flex items-center gap-2 rounded-full hover:scale-105 transition-all cursor-pointer text-xs sm:text-sm bg-primary text-white px-4 sm:px-6 py-2 sm:py-2.5 font-medium'
        >
          Logout
          <img src={assets.arrow} alt="logout" className='w-3 h-3' />
        </button>
      </div>

      {/* Content from child routes */}
      <div className='flex h-[calc(100vh-80px)] sm:h-[calc(100vh-90px)]'>
        <Sidebar />
        <div className='flex-1 overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;