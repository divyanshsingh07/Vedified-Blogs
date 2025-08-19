import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { title, description, category, image, _id } = blog;
    const navigate = useNavigate();
    
    // Function to strip HTML tags for preview
    const stripHtml = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    
    const previewText = stripHtml(description).slice(0, 80);
    
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
        <div 
            onClick={() => navigate(`/blog/${_id}`)} 
            className='group w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 backdrop-blur-sm'
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img 
                    src={image} 
                    alt={title}  
                    className='w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <span className='absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-md border border-white/20 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300'>
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
                    className='text-sm sm:text-base text-slate-600 leading-relaxed font-medium tracking-wide group-hover:text-slate-700 transition-colors duration-300'
                    style={cardStyles.description}
                >
                    {previewText}...
                </p>
                
                {/* Bottom accent line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </div>
    )
}

export default BlogCard