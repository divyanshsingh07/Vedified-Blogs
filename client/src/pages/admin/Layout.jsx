import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {assets} from '../../assets/assets';
import Sidebar from '../../components/admin/Sidebar';

const Layout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };



  return (
    <>
      {/* Navbar - Same as regular Navbar but with Logout */}
      <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
        <img onClick={() => navigate('/')} src={assets.logo} alt='logo' className='w-32 sm:w-44 cursor-pointer'/> 
        <button onClick={handleLogout} className='flex items-center gap-2 rounded-full hover:scale-105 transition-all cursor-pointer text-sm bg-primary text-white px-6 py-2.5 mr-4'>Logout
          <img src={assets.arrow} alt="logout" className='w-3' />
        </button>
      </div>

      {/* Content from child routes */}
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
      <Outlet />
      </div>
     
    </>
  );
};

export default Layout;