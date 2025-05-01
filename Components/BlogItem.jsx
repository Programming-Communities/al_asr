import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogItem = ({title, description, category,image}) => {
  return (
    <div className='max-w-[330px] sm:max-w [300px] bg-white border border-red-900 hover:shadow-[-7px_7px_0px_#8b0000bb]'>
      <Image src={image} alt='' width={400} height={400} className='border-b border-red-900'/>
    <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>
    <div className='p-5'>
    <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
    <p className='mb-3 best-sm tracking-tight text-gray-700'>{description}</p>
    <div className='inline-flex items-center py-2 font-semibold text-center'>
        Read more <Image src={assets.arrow}className='ml-2'  alt='arrow' width={12} height={12}  />
    </div>
    </div>
    </div>
  )
}

export default BlogItem
