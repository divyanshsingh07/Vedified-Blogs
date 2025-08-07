import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-5 md:px-16 xl:px-24 lg:px-32 bg-primary/3 '>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10
py-10 border-b border-gray-500/30 text-gray-500'>
        <div>
          <img src={assets.logo} alt="logo-footer" className='w-32 sm:w-44' />
          <p className='max-w-[400px] mt-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi amet temporibus officiis esse cupiditate ipsam soluta, porro suscipit quisquam, fugiat rerum ducimus asperiores animi aut doloribus quod vel tenetur voluptatibus.</p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5 '>
          {footer_data.map((section,index)=>
          <div key={index}>
            <h3 className=' cursor-pointer text-xl text-black '>{section.title}</h3>
            <ul className=''>
              {section.links.map((link,i)=>
              <li key={i} className='hover:underline '>
                <a href="#">{link}</a>
              </li>
              
              )}
            </ul>

          </div>
          )}

        </div>

      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 all right reserve </p>

    </div>
  )
}

export default Footer
