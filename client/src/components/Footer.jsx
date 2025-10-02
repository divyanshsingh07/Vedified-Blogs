import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-5 md:px-16 xl:px-24 lg:px-32 bg-white border-t border-slate-200/60'>
      <div className='py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start'>
        <div>
          <div className='inline-flex items-center gap-3'>
            <img src={assets.logo} alt="logo-footer" className='w-32 sm:w-44' />
          </div>
          <div className='h-1 w-20 bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 rounded-full mt-3'></div>
          <p className='max-w-[420px] mt-5 text-slate-600 leading-relaxed font-medium'>
            Vedified helps you write, publish, and grow—powered by AI, designed for creators.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className='text-slate-800 font-bold mb-3'>Subscribe to our newsletter</h3>
          <p className='text-slate-500 text-sm mb-4'>Get the latest posts and platform updates.</p>
          <form className='flex items-center gap-2'>
            <input type='email' placeholder='Enter your email' className='flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-pink-200' />
            <button type='button' className='rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 text-white px-5 py-2.5 text-sm font-semibold shadow hover:shadow-[0_0_24px_rgba(236,72,153,0.35)] transition-all'>Subscribe</button>
          </form>
        </div>

        {/* Quick Links */}
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <h4 className='text-sm font-bold text-slate-800 mb-3'>Company</h4>
            <ul className='space-y-2 text-sm text-slate-600'>
              <li><a href='#' className='hover:text-pink-500'>About</a></li>
              <li><a href='#' className='hover:text-pink-500'>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className='text-sm font-bold text-slate-800 mb-3'>Legal</h4>
            <ul className='space-y-2 text-sm text-slate-600'>
              <li><a href='#' className='hover:text-pink-500'>Privacy</a></li>
              <li><a href='#' className='hover:text-pink-500'>Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='py-6 border-t border-slate-200 text-center'>
        <p className='text-xs md:text-sm text-slate-500'>© 2025 Vedified. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
