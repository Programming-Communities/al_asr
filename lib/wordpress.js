// lib/wordpress.js
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://admin-al-asr.centers.pk/graphql', {
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout for better error handling
  timeout: 10000,
});

// Fallback data in case of errors
const fallbackPosts = [
  {
    id: '1',
    title: 'Welcome to Al-Asr Hussaini Calendar',
    excerpt: '<p>Islamic services and calendar information for the community.</p>',
    date: new Date().toISOString(),
    slug: 'welcome-to-al-asr',
    status: 'publish',
    featuredImage: {
      node: {
        sourceUrl: '/default-image.jpg',
        altText: 'Al-Asr Center'
      }
    },
    categories: {
      nodes: [
        { name: 'Islamic', slug: 'islamic' }
      ]
    },
    author: {
      node: {
        name: 'Admin'
      }
    }
  }
];

const fallbackCategories = [
  { slug: 'islamic', name: 'Islamic', count: 1 },
  { slug: 'calendar', name: 'Calendar', count: 0 },
  { slug: 'events', name: 'Events', count: 0 }
];

export async function getPosts() {
  const query = `
    {
      posts {
        nodes {
          id
          title
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    console.log('✅ Successfully fetched posts:', data.posts.nodes.length);
    return data.posts.nodes;
  } catch (error) {
    console.error('❌ Error fetching posts from WordPress:', error);
    console.log('🔄 Using fallback posts data');
    return fallbackPosts;
  }
}

export async function getPostsByCategory(categorySlug) {
  const query = `
    query GetPostsByCategory($categorySlug: String!) {
      posts(where: {categoryName: $categorySlug}) {
        nodes {
          id
          title
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query, { categorySlug });
    return data.posts.nodes;
  } catch (error) {
    console.error('❌ Error fetching posts by category:', error);
    return fallbackPosts.filter(post => 
      post.categories.nodes.some(cat => cat.slug === categorySlug)
    );
  }
}

export async function getAllCategories() {
  const query = `
    {
      categories {
        nodes {
          slug
          name
          count
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    console.log('✅ Successfully fetched categories:', data.categories.nodes.length);
    return data.categories.nodes.filter(cat => cat.count > 0); // Only return categories with posts
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    console.log('🔄 Using fallback categories data');
    return fallbackCategories;
  }
}

export async function testConnection() {
  const query = `
    {
      generalSettings {
        title
        description
        url
      }
    }
  `;

  try {
    const data = await client.request(query);
    return { 
      success: true, 
      data: data.generalSettings,
      message: '✅ Successfully connected to WordPress with WPGraphQL'
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      message: '❌ Failed to connect to WordPress GraphQL endpoint'
    };
  }
}