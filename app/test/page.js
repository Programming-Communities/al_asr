// app/test/page.js
import { getPosts } from '@/lib/wordpress'

export default async function TestPage() {
  const posts = await getPosts()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">WordPress Connection Test</h1>
      <p className="mb-4">Total Posts: {posts.length}</p>
      
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">ID: {post.id}</p>
            <p className="text-gray-600">Slug: {post.slug}</p>
            {post.featuredImage?.node && (
              <p className="text-green-600">Has Image: Yes</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}