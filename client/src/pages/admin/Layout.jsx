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
      <div className='flex justify-between items-center py-2 sm:py-3 px-4 sm:px-8 lg:px-20 xl:px-32 bg-amber-50 border-b-2 border-black'>
        <div className='flex items-center gap-3'>
          <img 
            onClick={handleLogoClick} 
            src={assets.logo} 
            alt='logo' 
            className='w-20 sm:w-24 lg:w-32 cursor-pointer hover:opacity-80 transition-opacity' 
          />
          {adminInfo && (
            <div className='hidden sm:block'>
              <p className='text-xs text-gray-800 font-semibold'>Welcome back,</p>
              <p className='text-base font-black text-black'>{adminInfo.name}</p>
            </div>
          )}
        </div>
        <button 
          onClick={handleLogout} 
          className='flex items-center gap-2 rounded-full hover:scale-105 hover:bg-gray-800 transition-all cursor-pointer text-xs bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 font-bold uppercase tracking-wide border-2 border-black'
        >
          Logout
          <img src={assets.arrow} alt="logout" className='w-3 h-3' />
        </button>
      </div>

      {/* Content from child routes */}
      <div className='flex h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)]'>
        <Sidebar />
        <div className='flex-1 overflow-y-auto bg-gray-100'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;