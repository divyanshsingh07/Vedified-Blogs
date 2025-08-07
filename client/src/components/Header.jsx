import React from 'react'
import { assets } from '../assets/assets'

function Header() {
    return (
        <div className='mx-8 sm:mx-16 xl:mx-32 relative'>
            <div className='text-center mt-20 mb-8'>
                <div className="inline-flex items-center justify-center border rounded-full px-10 py-1 gap-1 text-sm font-medium text-gray-700 border-gray-300 bg-blue-100">
                    <p>Write Your BLOG with help of AI</p>
                    <img src={assets.star_icon} alt="star" className="w-2.5 h-2.5" />
                </div>
                <p className='text-7xl py-8'>Your own <span className='text-7xl text-blue-500'>blogging <br /> </span>
                    platform.</p>

            </div>
            <form className='flex items-center max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                <input
                    type="text"
                    placeholder="Search for blogs"
                    required
                    className='flex-1 pl-4 py-2 outline-none'
                />
                <button
                    type="submit"
                    className='bg-primary text-white px-6 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'
                >
                    Search
                </button>
            </form>



            <img src={assets.gradientBackground} alt="bg" className=' absolute -top-[30%] opacity-50 -z-10' />


        </div>
    )
}

export default Header
