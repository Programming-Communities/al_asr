'use client'
import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'
import { getPosts, getAllCategories } from '@/lib/wordpress'

const BlogList = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Islamic-themed categories
  const islamicCategories = [
    { slug: 'all', name: 'All Posts' },
    { slug: 'islamic-calendar', name: 'Islamic Calendar' },
    { slug: 'events', name: 'Events' },
    { slug: 'services', name: 'Services' },
    { slug: 'news', name: 'News' },
    { slug: 'uncategorized', name: 'General' }
  ]

  useEffect(() => {
    setIsClient(true)
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [postsData, categoriesData] = await Promise.all([
        getPosts(),
        getAllCategories()
      ])
      
      setPosts(postsData)
      
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
      setCategories(islamicCategories)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = async (categorySlug) => {
    setActiveCategory(categorySlug)
    
    const allPosts = await getPosts()
    if (categorySlug === 'all') {
      setPosts(allPosts)
    } else {
      const filteredPosts = allPosts.filter(post => 
        post.categories?.nodes?.some(cat => cat.slug === categorySlug)
      )
      setPosts(filteredPosts)
    }
  }

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Content...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      {/* REMOVED: Duplicate heading section */}

      {/* Category Filters */}
      <div className='flex justify-center gap-3 my-10 flex-wrap'>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`py-2 px-5 rounded-sm transition-all font-medium ${
              activeCategory === category.slug
                ? 'bg-red-900 text-white shadow-[-4px_4px_0px_#8b0000]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => handleCategoryChange(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
          {posts.map((post) => (
            <BlogItem
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              categories={post.categories?.nodes}
              featuredImage={post.featuredImage?.node}
              date={post.date}
              slug={post.slug}
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
              No content available yet. Please check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogList