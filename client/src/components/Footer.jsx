import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-5 md:px-16 xl:px-24 lg:px-32 bg-amber-50 border-t-2 border-black'>
      <div className='py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
        <div>
          <div className='inline-flex items-center gap-3'>
            <img src={assets.logo} alt="logo-footer" className='w-24 sm:w-32' />
          </div>
          <div className='h-1 w-20 bg-black rounded-full mt-3'></div>
          <p className='max-w-[420px] mt-3 text-gray-800 leading-relaxed font-semibold text-sm'>
            Vedified helps you write, publish, and grow—powered by AI, designed for creators.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className='text-black font-bold mb-2 text-sm'>Subscribe to our newsletter</h3>
          <p className='text-gray-700 text-xs mb-3 font-semibold'>Get the latest posts and platform updates.</p>
          <form className='flex items-center gap-2'>
            <input type='email' placeholder='Enter your email' className='flex-1 rounded-xl border-2 border-black px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-black font-semibold' />
            <button type='button' className='rounded-xl bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wide shadow hover:bg-gray-800 hover:shadow-lg transition-all border-2 border-black'>Subscribe</button>
          </form>
        </div>

        {/* Quick Links */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h4 className='text-xs font-bold text-black mb-2'>Company</h4>
            <ul className='space-y-1 text-xs text-gray-800 font-semibold'>
              <li><a href='#' className='hover:text-black'>About</a></li>
              <li><a href='#' className='hover:text-black'>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className='text-xs font-bold text-black mb-2'>Legal</h4>
            <ul className='space-y-1 text-xs text-gray-800 font-semibold'>
              <li><a href='#' className='hover:text-black'>Privacy</a></li>
              <li><a href='#' className='hover:text-black'>Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='py-3 border-t-2 border-black text-center'>
        <p className='text-xs text-gray-800 font-semibold'>© 2025 Vedified. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
