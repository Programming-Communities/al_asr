// app/graphql-test/page.js
import { getPosts, getAllCategories, testConnection } from '@/lib/wordpress'

export default async function GraphQLTest() {
  const connection = await testConnection()
  const posts = await getPosts()
  const categories = await getAllCategories()

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">WordPress GraphQL Connection Test</h1>
      
      {/* Connection Status */}
      <div className={`p-6 rounded-lg mb-8 ${
        connection.success ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'
      }`}>
        <h2 className="text-xl font-semibold mb-4">
          {connection.success ? '✅ Connection Successful' : '❌ Connection Failed'}
        </h2>
        {connection.success ? (
          <div className="space-y-2">
            <p><strong>Site Title:</strong> {connection.data.title}</p>
            <p><strong>Site URL:</strong> {connection.data.url}</p>
            <p><strong>Description:</strong> {connection.data.description || 'No description set'}</p>
            <p className="text-green-700 font-medium">{connection.message}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-red-700"><strong>Error:</strong> {connection.error}</p>
            <p className="text-red-700">{connection.message}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Posts Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          <p className="mb-4 text-lg">
            <span className="font-semibold">Total Posts Found:</span> 
            <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
              posts.length > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {posts.length}
            </span>
          </p>

          {posts.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="border border-gray-300 rounded p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg text-gray-800">{post.title}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p><strong>ID:</strong> {post.id}</p>
                    <p><strong>Slug:</strong> {post.slug}</p>
                    <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
                    <p><strong>Categories:</strong> {post.categories?.nodes?.map(cat => cat.name).join(', ') || 'Uncategorized'}</p>
                    <p><strong>Author:</strong> {post.author?.node?.name || 'Unknown'}</p>
                    {post.featuredImage?.node ? (
                      <p className="text-green-600">✅ Has featured image</p>
                    ) : (
                      <p className="text-gray-500">❌ No featured image</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-yellow-800">No posts found in WordPress.</p>
              <p className="text-yellow-700 text-sm mt-2">
                This could mean:
              </p>
              <ul className="list-disc list-inside text-yellow-700 text-sm mt-1">
                <li>No posts have been created yet</li>
                <li>Posts are in draft status</li>
                <li>There might be a permission issue</li>
              </ul>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <p className="mb-4 text-lg">
            <span className="font-semibold">Total Categories:</span> 
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {categories.length}
            </span>
          </p>

          {categories.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.slug} className="border border-gray-300 rounded p-3 bg-gray-50">
                  <h4 className="font-semibold text-gray-800">{category.name}</h4>
                  <div className="text-sm text-gray-600 mt-1">
                    <p><strong>Slug:</strong> {category.slug}</p>
                    <p><strong>Post Count:</strong> {category.count || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-yellow-800">No categories found in WordPress.</p>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">Next Steps:</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700">
          <li>If posts are showing, your setup is working correctly!</li>
          <li>If no posts are showing, create some posts in WordPress admin</li>
          <li>Make sure posts are published (not draft)</li>
          <li>Add featured images and categories to posts for better display</li>
          <li>Visit your main page to see the blog in action</li>
        </ul>
      </div>
    </div>
  )
}