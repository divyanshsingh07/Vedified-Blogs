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
            className='group w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 backdrop-blur-sm'
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
                    className='w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <span className='absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-primary to-hover-primary text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-md border border-white/20 group-hover:from-primary group-hover:to-hover-primary transition-all duration-300'>
                    {category}
                </span>
                
                {/* Read More Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <div className='p-6 sm:p-7 lg:p-8 bg-gradient-to-br from-white to-slate-50/50'>
                <h5 
                    className='mb-4 text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight tracking-tight group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300'
                    style={cardStyles.title}
                >
                    {title}
                </h5>
                <p 
                    className='text-sm sm:text-base text-slate-600 leading-relaxed font-medium tracking-wide group-hover:text-hover-primary transition-colors duration-300'
                    style={cardStyles.description}
                >
                    {previewText}...
                </p>
                <div className='mt-4 flex items-center justify-between text-xs text-slate-500 font-semibold'>
                  <div className='flex items-center gap-2'>
                    <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100'>
                      <svg className='w-3.5 h-3.5 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z' />
                      </svg>
                    </span>
                    <span>{authorName || 'Anonymous'}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <svg className='w-4 h-4 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <span>{readTimeMinutes} min read</span>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-primary via-hover-primary to-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </motion.div>
    )
}

export default BlogCard