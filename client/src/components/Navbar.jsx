import React, { useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

function Navbar(){
  //const navigate =useNavigate();
const{navigate,token,user}=useAppContext();
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener('scroll', onScroll);
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}, []);

  return (
    <div className={`sticky top-0 z-40 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className='bg-amber-50 border-b-2 border-black'>
        <div className='flex justify-between items-center py-3 md:py-4 max-w-7xl mx-auto px-4 sm:px-8 xl:px-12'>
          <img onClick={()=> navigate('/')} src={assets.logo} alt='logo' className='w-16 sm:w-20 lg:w-24 cursor-pointer'/> 

          {/* Center nav removed as requested */}

          {token ? (
            <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full px-3 py-2 pr-4 border-2 border-black bg-white hover:bg-amber-100 hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all'>
              <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-black'>
                <img src={assets.user_icon} alt='avatar' className='w-4 h-4 invert' />
              </span>
              <span className='text-xs font-bold text-black truncate max-w-[120px]'>
                {user?.name || user?.email || 'Account'}
              </span>
            </button>
          ) : (
            <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full text-xs bg-black text-white px-4 py-2 mr-0 shadow-lg hover:bg-gray-800 hover:shadow-xl hover:scale-[1.03] active:scale-100 transition-all border-2 border-black'>
              Login
              <img src={assets.arrow} alt="login" className='w-3' />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
