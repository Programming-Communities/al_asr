// Components/BlogItem.jsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import SocialShareButtons from './SocialShareButtons'

// Detect if text is Urdu or Arabic (RTL languages)
function isRTLText(text) {
  if (!text) return false;
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
}

// Detect specific language for better styling
function detectLanguage(text) {
  if (!text) return 'english';
  
  const urduRegex = /[\u0600-\u06FF]/;
  const arabicRegex = /[\u0750-\u077F]/;
  
  if (urduRegex.test(text)) return 'urdu';
  if (arabicRegex.test(text)) return 'arabic';
  
  return 'english';
}

const BlogItem = ({ title, excerpt, categories, featuredImage, date, slug, index = 0 }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  
  // Strip HTML tags from excerpt and limit length
  const cleanExcerpt = excerpt 
    ? excerpt.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
    : 'Read more about this post...';
  
  // Get first category or default
  const category = categories && categories.length > 0 ? categories[0].name : 'General';
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Detect language and text direction
  const language = detectLanguage(title);
  const isRTL = isRTLText(title);
  const excerptIsRTL = isRTLText(cleanExcerpt);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className='max-w-[330px] bg-white dark:bg-gray-800 border border-red-900 dark:border-red-800 hover:shadow-[-7px_7px_0px_#8b0000bb] dark:hover:shadow-[-7px_7px_0px_#7f1d1d] transition-all duration-300 cursor-pointer mx-auto group'>
      <Link href={`/posts/${slug}`}>
        <div className='relative h-48 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
          {featuredImage?.sourceUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse z-10"></div>
              )}
              <Image 
                src={featuredImage.sourceUrl} 
                alt={featuredImage.altText || title} 
                fill
                className='border-b border-red-900 dark:border-red-800 object-cover group-hover:scale-105 transition-transform duration-300'
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                loading={index < 4 ? "eager" : "lazy"}
                priority={index < 2}
                onError={handleImageError}
                onLoad={handleImageLoad}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgDRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
              />
            </>
          ) : (
            <div className='flex items-center justify-center h-full bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600'>
              <div className='text-center p-4'>
                <svg className="w-12 h-12 text-red-300 dark:text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className='text-red-400 dark:text-gray-300 text-sm'>No Image Available</p>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      {/* Category and Social Share Row */}
      <div className='px-5 pt-5 flex justify-between items-center'>
        <span className='inline-block bg-red-900 dark:bg-red-800 text-white text-xs px-3 py-1 rounded-full font-medium'>
          {category}
        </span>
        
        {/* Social Share Button */}
        <div className="relative">
          <button 
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={() => setShowSocialMenu(!showSocialMenu)}
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
          
          {/* Social Share Dropdown */}
          {showSocialMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 min-w-[140px] z-10">
              <SocialShareButtons title={title} slug={slug} excerpt={cleanExcerpt} />
            </div>
          )}
        </div>
      </div>

      <div className='p-5'>
        <Link href={`/posts/${slug}`}>
          <h3 
            className={`mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[56px] leading-tight group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-200 ${
              isRTL ? 'text-right' : 'text-left'
            } ${language}-text`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {title}
          </h3>
        </Link>
        
        <p 
          className={`mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[60px] leading-relaxed ${
            excerptIsRTL ? 'text-right' : 'text-left'
          }`}
          dir={excerptIsRTL ? 'rtl' : 'ltr'}
        >
          {cleanExcerpt}
        </p>
        
        <div className='flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700'>
          <span className='text-xs text-gray-500 dark:text-gray-400 english-text font-medium'>
            {formattedDate}
          </span>
          <Link 
            href={`/posts/${slug}`}
            className='inline-flex items-center font-medium text-red-900 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors text-sm english-text group/link'
          >
            Read More
            <svg className='ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogItem