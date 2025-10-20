// Components/SkeletonLoader.jsx
import React from 'react'

export const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="py-5 px-5 md:px-12 lg:px-28 bg-gradient-to-b from-white to-red-50">
        <div className="flex justify-between items-center">
          <div className="w-[130px] sm:w-[160px] h-[60px] bg-gray-300 rounded animate-pulse"></div>
          <div className="w-0"></div>
        </div>
        
        <div className="text-center my-12">
          <div className="h-12 bg-gray-300 rounded animate-pulse mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse mt-6 mx-auto max-w-2xl"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse mt-4 mx-auto max-w-xl w-3/4"></div>
          <div className="h-12 bg-gray-300 rounded animate-pulse mt-8 mx-auto max-w-sm"></div>
        </div>
      </div>

      {/* Blog List Skeleton */}
      <div className="container mx-auto px-4">
        {/* Category Filters Skeleton */}
        <div className='flex justify-center gap-3 my-10 flex-wrap'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="py-2 px-5 bg-gray-300 rounded-sm animate-pulse w-20 h-9"></div>
          ))}
        </div>

        {/* Posts Grid Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className='max-w-[330px] bg-white border border-gray-300 mx-auto animate-pulse'>
              {/* Image Skeleton */}
              <div className='h-48 w-full bg-gray-300'></div>
              
              {/* Category Skeleton */}
              <div className='px-5 pt-5'>
                <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
              </div>

              {/* Content Skeleton */}
              <div className='p-5'>
                <div className="h-6 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                
                <div className='flex justify-between items-center pt-3 border-t border-gray-200'>
                  <div className="w-16 h-3 bg-gray-300 rounded"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const PostPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        {/* Featured Image Skeleton */}
        <div className="h-96 w-full bg-gray-300"></div>

        {/* Content Skeleton */}
        <div className="p-8">
          {/* Categories Skeleton */}
          <div className="mb-4">
            <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
          </div>

          {/* Title Skeleton */}
          <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-8 bg-gray-300 rounded mb-6 w-1/2"></div>

          {/* Meta Info Skeleton */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Back Button Skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="w-32 h-6 bg-gray-300 rounded float-right"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const BlogItemSkeleton = () => {
  return (
    <div className='max-w-[330px] bg-white border border-gray-300 mx-auto animate-pulse'>
      {/* Image Skeleton */}
      <div className='h-48 w-full bg-gray-300'></div>
      
      {/* Category Skeleton */}
      <div className='px-5 pt-5'>
        <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className='p-5'>
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
        
        <div className='flex justify-between items-center pt-3 border-t border-gray-200'>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}