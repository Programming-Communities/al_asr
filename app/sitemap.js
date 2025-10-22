// app/sitemap.js
import { GraphQLClient } from 'graphql-request';

const baseUrl = 'https://al-asr.centers.pk'

// WordPress GraphQL client
const client = new GraphQLClient('https://admin-al-asr.centers.pk/graphql');

export default async function sitemap() {
  try {
    console.log('🔄 Generating sitemap...')
    
    // WordPress se posts fetch karo
    const posts = await fetchPosts()
    
    const postUrls = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const sitemapData = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...postUrls,
    ]

    console.log('✅ Sitemap generated with', sitemapData.length, 'URLs')
    return sitemapData
    
  } catch (error) {
    console.error('❌ Sitemap generation error:', error)
    // Fallback - at least home page return karo
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ]
  }
}

async function fetchPosts() {
  try {
    const query = `
      {
        posts(first: 100, where: {status: PUBLISH}) {
          nodes {
            slug
            date
            modified
          }
        }
      }
    `
    const data = await client.request(query)
    console.log('📄 Sitemap posts fetched:', data.posts.nodes.length)
    return data.posts.nodes
  } catch (error) {
    console.error('❌ Error fetching posts for sitemap:', error)
    return []
  }
}