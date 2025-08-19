import React from 'react'

const WelcomeNote = () => {
    return (
        <div className='flex justify-center items-center flex-col py-16 px-6 bg-gradient-to-br from-white via-white to-gray-100 relative overflow-hidden'>
            {/* Background Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-coral-200/30 rounded-full blur-3xl"></div>
            
            {/* Welcome Icon */}
            <div className="mb-8 p-6 bg-gradient-to-br from-teal-500 to-coral-500 rounded-full shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>

            {/* Main Heading */}
            <h1 className='text-center bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight'>
                Welcome to Our Blog
            </h1>
            
            {/* Subtitle */}
            <h2 className='text-center text-navy-800 text-xl md:text-2xl font-semibold mb-8 max-w-2xl leading-relaxed'>
                Discover Stories That Inspire & Inform
            </h2>
            
            {/* Description */}
            <p className='text-center text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl font-medium tracking-wide mb-10'>
                Dive into our collection of carefully crafted articles, insights, and stories. 
                Whether you're here to learn something new, find inspiration, or explore fresh perspectives, 
                you've come to the right place. Every post is written with passion and purpose to bring 
                value to your reading experience.
            </p>

            {/* Call to Action Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8'>
                <div className='group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-hover-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                    <div className='w-12 h-12 bg-gradient-to-br from-teal-500 to-coral-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 className='font-bold text-navy-800 text-lg mb-2 group-hover:text-hover-primary transition-colors duration-300'>
                        Fresh Ideas
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Explore innovative concepts and creative solutions that spark your imagination.
                    </p>
                </div>

                <div className='group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-coral-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                    <div className='w-12 h-12 bg-gradient-to-br from-coral-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className='font-bold text-navy-800 text-lg mb-2 group-hover:text-coral-600 transition-colors duration-300'>
                        Expert Insights
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Learn from industry experts and thought leaders sharing their knowledge.
                    </p>
                </div>

                <div className='group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-hover-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
                    <div className='w-12 h-12 bg-gradient-to-br from-navy-700 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h-0a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className='font-bold text-navy-800 text-lg mb-2 group-hover:text-hover-primary transition-colors duration-300'>
                        Community
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        Join a vibrant community of readers and writers sharing experiences.
                    </p>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className='mt-12 w-24 h-1 bg-gradient-to-r from-teal-500 via-coral-500 to-navy-700 rounded-full'></div>
        </div>
    )
}

export default WelcomeNote