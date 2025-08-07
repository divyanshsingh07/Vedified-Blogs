import React from 'react'

const Newsletter = () => {
    return (
        <div className='flex justify-center items-center flex-col'>
            <h1 className='text-black text-4xl my-1'>Never Miss a Blog!</h1>
            <p className=' text-gray-400'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
            <form className=' my-8 flex items-center w-full max-w-2xl max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                <input
                    type="text"
                    placeholder="Enter your email ID"
                    required
                    className='flex-1 pl-4 py-2 outline-none'
                />
                <button
                    type="submit"
                    className='bg-primary text-white px-6 py-2 m-2 rounded hover:scale-105 transition-all cursor-pointer'
                >
                    Subscribe
                </button>
            </form>


        </div>
    )
}

export default Newsletter
