// Components/BlogList.jsx
'use client'
import React, { useState, useEffect } from 'react'
import BlogItem from './BlogItem'
import { BlogItemSkeleton } from './SkeletonLoader'
import { getPosts, getAllCategories } from '@/lib/wordpress'

const BlogList = ({ 
  showTitle = true,
  currentPostSlug = null // Exclude current post from related posts
}) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [categories, setCategories] = useState({ 
    categoryTree: [], 
    allCategories: [] 
  })
  const [activeCategory, setActiveCategory] = useState('all')
  const [openDropdowns, setOpenDropdowns] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    // Filter posts when activeCategory changes
    let filtered = posts;
    
    if (activeCategory === 'all') {
      filtered = posts;
    } else {
      filtered = posts.filter(post => 
        post.categories?.nodes?.some(cat => cat.slug === activeCategory)
      )
    }
    
    // Exclude current post if provided
    if (currentPostSlug) {
      filtered = filtered.filter(post => post.slug !== currentPostSlug)
    }
    
    setFilteredPosts(filtered)
  }, [activeCategory, posts, currentPostSlug])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [postsData, categoriesData] = await Promise.all([
        getPosts(),
        getAllCategories()
      ])
      
      setPosts(postsData)
      
      // Initial filtering
      let initialFiltered = postsData;
      if (currentPostSlug) {
        initialFiltered = postsData.filter(post => post.slug !== currentPostSlug)
      }
      setFilteredPosts(initialFiltered)
      
      if (categoriesData && categoriesData.categoryTree.length > 0) {
        // Add "All Posts" category ONLY here
        const allPostsCategory = {
          slug: 'all',
          name: 'All Posts',
          children: []
        }
        
        const finalCategoryTree = [allPostsCategory, ...categoriesData.categoryTree];
        console.log('🎯 Final Category Tree for UI:', finalCategoryTree);
        
        setCategories({
          categoryTree: finalCategoryTree,
          allCategories: categoriesData.allCategories
        })
      } else {
        // Fallback categories
        const fallbackTree = [
          { slug: 'all', name: 'All Posts', children: [] },
          { slug: 'islamic-calendar', name: 'Islamic Calendar', children: [] },
          { slug: 'events', name: 'Events', children: [] }
        ]
        
        setCategories({
          categoryTree: fallbackTree,
          allCategories: fallbackTree
        })
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categorySlug) => {
    console.log('🎯 Category clicked:', categorySlug);
    setActiveCategory(categorySlug)
    setOpenDropdowns(new Set()) // Close all dropdowns when category changes
  }

  const toggleDropdown = (categorySlug, level = 0) => {
    const key = `${categorySlug}-${level}`
    const newOpenDropdowns = new Set(openDropdowns)
    
    if (newOpenDropdowns.has(key)) {
      newOpenDropdowns.delete(key)
    } else {
      newOpenDropdowns.add(key)
    }
    
    setOpenDropdowns(newOpenDropdowns)
  }

  // Recursive function to find category name by slug
  const findCategoryName = (slug, categoryList = categories.categoryTree) => {
    for (const category of categoryList) {
      if (category.slug === slug) return category.name
      if (category.children && category.children.length > 0) {
        const found = findCategoryName(slug, category.children)
        if (found) return found
      }
    }
    return 'Selected Category'
  }

  // Recursive component to render nested categories with CLICK-based dropdowns
  const CategoryDropdown = ({ category, level = 0 }) => {
    const hasChildren = category.children && category.children.length > 0
    const isActive = activeCategory === category.slug
    const dropdownKey = `${category.slug}-${level}`
    const isOpen = openDropdowns.has(dropdownKey)

    const handleCategoryClick = () => {
      if (hasChildren) {
        // Toggle dropdown for categories with children
        toggleDropdown(category.slug, level)
      } else {
        // Select category for categories without children
        handleCategoryChange(category.slug)
      }
    }

    const handleSubCategoryClick = (subCategorySlug) => {
      handleCategoryChange(subCategorySlug)
      setOpenDropdowns(new Set()) // Close all dropdowns
    }

    return (
      <div 
        key={dropdownKey}
        className={`category-dropdown ${level > 0 ? 'nested' : ''}`}
      >
        <button
          className={`category-button ${isActive ? 'active' : ''} ${hasChildren ? 'has-children' : ''} level-${level}`}
          onClick={handleCategoryClick}
          type="button"
        >
          <span className="category-name">{category.name}</span>
          
          {/* Dropdown arrow for categories with children */}
          {hasChildren && (
            <svg 
              className={`dropdown-arrow w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {/* Children Categories Dropdown - CLICK based */}
        {hasChildren && isOpen && (
          <div 
            className={`subcategories-menu level-${level + 1}`}
          >
            {category.children.map((childCategory) => (
              <button
                key={`${childCategory.slug}-${level + 1}`}
                className={`subcategory-item ${activeCategory === childCategory.slug ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick(childCategory.slug)}
                type="button"
              >
                {childCategory.name}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-16 error-state">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Connection Error</h3>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button 
            onClick={fetchInitialData}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      {/* Show title only if prop is true */}
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Discover more Islamic content and events
          </p>
        </div>
      )}

      {/* Category Filters with CLICK-based Dropdowns */}
      <div className='flex justify-center gap-3 my-10 flex-wrap'>
        {categories.categoryTree.length > 0 ? (
          categories.categoryTree.map((category) => (
            <CategoryDropdown 
              key={`category-${category.slug}`} 
              category={category} 
            />
          ))
        ) : (
          !loading && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No categories available
            </div>
          )
        )}
      </div>

      {/* Active Category Info */}
      {activeCategory !== 'all' && (
        <div className="text-center mb-8">
          <div className="active-filter-badge">
            <span>
              Showing posts from: <strong>{findCategoryName(activeCategory)}</strong>
            </span>
            <button
              onClick={() => handleCategoryChange('all')}
              className="clear-filter-button"
              type="button"
            >
              ✕ Clear filter
            </button>
          </div>
        </div>
      )}

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
        <div className="text-center py-16 warning-state">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">No Posts Found</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            {activeCategory === 'all' 
              ? 'No other content available yet. Please check back later.'
              : `No posts found in "${findCategoryName(activeCategory)}" category.`
            }
          </p>
          {activeCategory !== 'all' && (
            <button
              onClick={() => handleCategoryChange('all')}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              type="button"
            >
              Show All Posts
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogList