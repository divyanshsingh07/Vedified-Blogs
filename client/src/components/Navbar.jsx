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
      <div className='backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200/60'>
        <div className='flex justify-between items-center py-3 md:py-4 max-w-7xl mx-auto px-4 sm:px-8 xl:px-12'>
          <img onClick={()=> navigate('/')} src={assets.logo} alt='logo' className='w-20 sm:w-24 lg:w-28 cursor-pointer'/> 

          {/* Center nav removed as requested */}

          {token ? (
            <button onClick={()=> navigate('/admin')} className='flex items-center gap-3 rounded-full px-2 py-1 pr-3 border border-slate-200 bg-white/80 hover:shadow-[0_0_26px_rgba(236,72,153,0.35)] hover:scale-[1.02] active:scale-100 transition-all'>
              <span className='inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-fuchsia-600 ring-2 ring-white/60'>
                <img src={assets.user_icon} alt='avatar' className='w-5 h-5 invert-0' />
              </span>
              <span className='text-sm font-semibold text-slate-800 truncate max-w-[140px]'>
                {user?.name || user?.email || 'Account'}
              </span>
            </button>
          ) : (
            <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 text-white px-6 py-2.5 mr-0 shadow-md hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] hover:scale-[1.03] active:scale-100 transition-all'>
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
