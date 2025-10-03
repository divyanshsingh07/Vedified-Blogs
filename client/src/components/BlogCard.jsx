import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

const BlogCard = ({ blog }) => {
    const { title, description, category, image, _id, authorName, createdAt } = blog;
    const navigate = useNavigate();
    
    // Function to strip HTML tags for preview
    const stripHtml = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    
    const previewText = stripHtml(description).slice(0, 80);
    const readTimeMinutes = Math.max(1, Math.round(stripHtml(description).split(/\s+/).length / 200));
    
    // Custom styles for text truncation
    const cardStyles = {
        title: {
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        description: {
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    };
    
    return (
        <motion.div 
            onClick={() => navigate(`/blog/${_id}`)} 
            className='group w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer bg-white border-2 border-black'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img 
                    src={image} 
                    alt={title}  
                    className='w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <span className='absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-bold rounded-full shadow-lg border border-white uppercase tracking-wide group-hover:bg-gray-800 transition-all duration-300'>
                    {category}
                </span>
                
                {/* Read More Indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-black">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className='p-4 sm:p-5 lg:p-6 bg-white'>
                <h5 
                    className='mb-3 text-base sm:text-lg lg:text-xl font-black text-black leading-tight tracking-tight group-hover:text-gray-800 transition-all duration-300'
                    style={cardStyles.title}
                >
                    {title}
                </h5>
                <p 
                    className='text-xs sm:text-sm text-gray-800 leading-relaxed font-semibold tracking-wide group-hover:text-black transition-colors duration-300'
                    style={cardStyles.description}
                >
                    {previewText}...
                </p>
                <div className='mt-3 flex items-center justify-between text-xs text-gray-700 font-bold'>
                  <div className='flex items-center gap-2'>
                    <span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-black'>
                      <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </span>
                    <span>{authorName || 'Anonymous'}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <svg className='w-3 h-3 text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span>{readTimeMinutes} min read</span>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className="mt-4 h-0.5 bg-black rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </motion.div>
    )
}

export default BlogCard