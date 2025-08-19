import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'

function Navbar(){
  //const navigate =useNavigate();
const{navigate,token}=useAppContext();

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
        <img onClick={()=> navigate('/')} src={assets.logo} alt='logo' className='w-20 sm:w-24 lg:w-32 cursor-pointer'/> 
        <button onClick={()=> navigate('/admin')} className='flex items-center gap-2 rounded-full hover:scale-105 transition-all cursor-pointer text-sm bg-primary text-white px-6 py-2.5 mr-4'>{token?'Dashboard':"Login"}
          <img src={assets.arrow} alt="login" className='w-3' />
        </button>
    </div>
  )
}

export default Navbar
