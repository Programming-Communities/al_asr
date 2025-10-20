// Components/CategoryFilter.jsx
'use client'
import React from 'react'

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className='flex justify-center gap-3 my-10 flex-wrap'>
      {categories.map((category) => (
        <button
          key={category.slug}
          className={`py-2 px-5 rounded-sm transition-all font-medium ${
            activeCategory === category.slug
              ? 'bg-red-900 text-white shadow-[-4px_4px_0px_#8b0000] transform -translate-y-1'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:shadow-md'
          }`}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter