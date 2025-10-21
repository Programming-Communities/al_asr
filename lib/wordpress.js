// lib/wordpress.js
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://admin-al-asr.centers.pk/graphql', {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
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

export async function getPosts() {
  const query = `
    {
      posts(first: 100) {
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
              parent {
                node {
                  slug
                  name
                }
              }
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
              parent {
                node {
                  slug
                  name
                }
              }
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
      categories(first: 100) {
        nodes {
          slug
          name
          parent {
            node {
              slug
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    console.log('✅ Raw categories data:', data.categories.nodes);
    
    const allCategories = data.categories.nodes;
    
    // Debug: Log all categories
    console.log('📊 Total categories from WordPress:', allCategories.length);
    allCategories.forEach((cat, index) => {
      console.log(`📁 ${index + 1}. ${cat.name} (${cat.slug}) - Parent: ${cat.parent?.node?.name || 'None'}`);
    });

    // Build tree structure for nested categories
    const buildCategoryTree = (categories) => {
      const categoryMap = new Map();
      const rootCategories = [];

      // First pass: create map of all categories
      categories.forEach(cat => {
        categoryMap.set(cat.slug, { 
          slug: cat.slug, 
          name: cat.name, 
          children: [] 
        });
      });

      // Second pass: build tree structure
      categories.forEach(cat => {
        const categoryNode = categoryMap.get(cat.slug);
        
        if (cat.parent?.node) {
          const parentNode = categoryMap.get(cat.parent.node.slug);
          if (parentNode) {
            parentNode.children.push(categoryNode);
          } else {
            // If parent not found, treat as root
            rootCategories.push(categoryNode);
          }
        } else {
          // No parent, so it's a root category
          rootCategories.push(categoryNode);
        }
      });

      return rootCategories;
    };

    const categoryTree = buildCategoryTree(allCategories);
    
    console.log('🌳 Final Category Tree Structure:', categoryTree);
    console.log('📊 Root categories in tree:', categoryTree.length);
    
    return {
      categoryTree: categoryTree, // Return only WordPress categories
      allCategories: allCategories.map(cat => ({
        slug: cat.slug,
        name: cat.name
      }))
    };
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    console.log('🔄 Using fallback categories data');
    
    const fallbackCategories = [
      { slug: 'islamic', name: 'Islamic' },
      { slug: 'calendar', name: 'Calendar' },
      { slug: 'events', name: 'Events' }
    ];
    
    const fallbackTree = fallbackCategories.map(cat => ({
      slug: cat.slug,
      name: cat.name,
      children: []
    }));
    
    return {
      categoryTree: fallbackTree,
      allCategories: fallbackCategories
    };
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