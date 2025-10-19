import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { assets } from "../Assets/assets";

// Detect if text is Urdu
function isUrduTitle(text) {
  if (!text) return false;
  const urduRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return urduRegex.test(text);
}

const BlogItem = ({ title, excerpt, categories, featuredImage, date, slug }) => {
  // Strip HTML tags from excerpt and limit length
  const cleanExcerpt = excerpt 
    ? excerpt.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
    : 'Read more about this post...';
  
  // Get first category or default
  const category = categories && categories.length > 0 ? categories[0].name : 'General';
  
  // Format date - use static format to avoid hydration issues
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Detect if title is Urdu
  const isUrdu = isUrduTitle(title);

  return (
    <div className='max-w-[330px] bg-white border border-red-900 hover:shadow-[-7px_7px_0px_#8b0000bb] transition-all duration-300 cursor-pointer mx-auto'>
      <Link href={`/posts/${slug}`}>
        {/* Image Container */}
        <div className='relative h-48 w-full bg-gray-200'>
          {featuredImage?.sourceUrl ? (
            <Image 
              src={featuredImage.sourceUrl} 
              alt={featuredImage.altText || title} 
              fill
              className='border-b border-red-900 object-cover'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className='flex items-center justify-center h-full bg-gradient-to-br from-red-50 to-red-100'>
              <div className='text-center p-4'>
                <svg className="w-12 h-12 text-red-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className='text-red-400 text-sm'>No Image</p>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      {/* Category Badge */}
      <div className='px-5 pt-5'>
        <span className='inline-block bg-red-900 text-white text-xs px-3 py-1 rounded-full'>
          {category}
        </span>
      </div>

      {/* Content */}
      <div className='p-5'>
        <Link href={`/posts/${slug}`}>
          <h3 className={`mb-3 text-lg font-semibold text-gray-900 line-clamp-2 min-h-[56px] leading-tight hover:text-red-700 transition-colors ${isUrdu ? 'urdu-text' : 'english-text'}`}>
            {title}
          </h3>
        </Link>
        
        <p className={`mb-4 text-sm text-gray-600 line-clamp-3 min-h-[60px] leading-relaxed ${isUrdu ? 'urdu-text' : 'english-text'}`}>
          {cleanExcerpt}
        </p>
        
        {/* Footer */}
        <div className='flex justify-between items-center pt-3 border-t border-gray-200'>
          <span className='text-xs text-gray-500 english-text'>{formattedDate}</span>
          <Link 
            href={`/posts/${slug}`}
            className='inline-flex items-center font-medium text-red-900 hover:text-red-700 transition-colors text-sm english-text'
          >
            Read More
            <svg className='ml-2 w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogItem