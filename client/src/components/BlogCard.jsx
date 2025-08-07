import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const{ title , description,category,image,_id}=blog;
    const navigate=useNavigate();
    
    // Function to strip HTML tags for preview
    const stripHtml = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };
    
    const previewText = stripHtml(description).slice(0, 80);
    
  return (
    <div onClick={()=> navigate(`/blog/${_id}` )} className=' w-full rounded-lg overflow-hidden shadow hover:scale-100 hover:shadow-primary/25 duration-300 cursor-pointer'>
        <img src={image} alt=""  className=' aspect-video'/>
        <span className=' ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-xs'>{category}</span>
        <div className=' p-5'>
            <h5 className=' mb-2 text-medium text-gray-600'>{title}</h5>
            <p className='mb-3 text-xs text-gray-600'>{previewText}...</p>
        </div>
      
    </div>
  )
}

export default BlogCard
