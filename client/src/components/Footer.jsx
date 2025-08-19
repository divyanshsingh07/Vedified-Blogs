import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-5 md:px-16 xl:px-24 lg:px-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border-t border-slate-200/60'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-slate-300/40'>
        <div className="group">
          <img src={assets.logo} alt="logo-footer" className='w-32 sm:w-44 transition-transform duration-300 group-hover:scale-105' />
          <p className='max-w-[400px] mt-6 text-slate-600 leading-relaxed font-medium tracking-wide group-hover:text-slate-700 transition-colors duration-300'>
          Vedified is an AI-powered blogging platform that helps you create, manage, and share blogs effortlessly. With smart writing assistance, elegant themes, and a seamless dashboard, it empowers creators to focus on ideas while AI handles formatting and style—making blogging faster, smarter, and more engaging.
          </p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-8'>
          {footer_data.map((section,index)=>
          <div key={index} className="group">
            <h3 className='cursor-pointer text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 mb-4 tracking-tight'>
              {section.title}
            </h3>
            <ul className='space-y-2'>
              {section.links.map((link,i)=>
              <li key={i} className='group/link'>
                <a href="#" className='text-slate-500 hover:text-indigo-600 transition-all duration-300 font-medium tracking-wide relative inline-block group-hover/link:translate-x-1'>
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover/link:w-full transition-all duration-300"></span>
                </a>
              </li>
              )}
            </ul>
          </div>
          )}
        </div>
      </div>
      <p className='py-6 text-center text-sm md:text-base text-slate-500 font-medium tracking-wide bg-gradient-to-r from-slate-500 to-slate-400 bg-clip-text text-transparent'>
        Copyright 2025 all right reserve
      </p>
    </div>
  )
}

export default Footer