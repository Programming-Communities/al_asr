// Components/BlogList.jsx
'use client'
import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'
import { BlogItemSkeleton } from './SkeletonLoader'
import { getPosts, getAllCategories } from '@/lib/wordpress'

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Islamic-themed categories fallback
  const islamicCategories = [
    { slug: 'all', name: 'All Posts' },
    { slug: 'islamic-calendar', name: 'Islamic Calendar' },
    { slug: 'events', name: 'Events' },
    { slug: 'services', name: 'Services' },
    { slug: 'news', name: 'News' },
    { slug: 'uncategorized', name: 'General' }
  ]

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    // Filter posts when activeCategory changes
    if (activeCategory === 'all') {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(post => 
        post.categories?.nodes?.some(cat => cat.slug === activeCategory)
      )
      setFilteredPosts(filtered)
    }
  }, [activeCategory, posts])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [postsData, categoriesData] = await Promise.all([
        getPosts(),
        getAllCategories()
      ])
      
      setPosts(postsData)
      setFilteredPosts(postsData)
      
      // Use WordPress categories if available, otherwise use fallback
      if (categoriesData && categoriesData.length > 0) {
        const formattedCategories = categoriesData.map(cat => ({
          slug: cat.slug,
          name: cat.name
        }))
        setCategories([{ slug: 'all', name: 'All Posts' }, ...formattedCategories])
      } else {
        setCategories(islamicCategories)
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to load content')
      setCategories(islamicCategories)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categorySlug) => {
    setActiveCategory(categorySlug)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={fetchInitialData}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      {/* Category Filters */}
      <div className='flex justify-center gap-3 my-10 flex-wrap'>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`py-2 px-5 rounded-sm transition-all font-medium ${
              activeCategory === category.slug
                ? 'bg-red-900 text-white shadow-[-4px_4px_0px_#8b0000] transform -translate-y-1'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handleCategoryChange(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <BlogItemSkeleton key={item} />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
          {filteredPosts.map((post, index) => (
            <BlogItem
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              categories={post.categories?.nodes}
              featuredImage={post.featuredImage?.node}
              date={post.date}
              slug={post.slug}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">No Posts Found</h3>
            <p className="text-yellow-700">
              {activeCategory === 'all' 
                ? 'No content available yet. Please check back later.'
                : `No posts found in "${categories.find(cat => cat.slug === activeCategory)?.name}" category.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList