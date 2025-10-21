// app/posts/[slug]/page.js
import { GraphQLClient } from 'graphql-request';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PostClient from './PostClient';

const client = new GraphQLClient('https://admin-al-asr.centers.pk/graphql');

// Better RTL detection function
function isRTLText(text) {
  if (!text) return false;
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
}

export async function generateStaticParams() {
  const query = `{ posts { nodes { slug } } }`;
  try {
    const data = await client.request(query);
    return data.posts.nodes.map((post) => ({ slug: post.slug }));
  } catch (error) {
    return [];
  }
}

async function getPost(slug) {
  const query = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id 
        title 
        content 
        date
        excerpt
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
  `;
  try {
    const data = await client.request(query, { slug });
    return data.post;
  } catch (error) {
    return null;
  }
}

// Simple PostPageSkeleton
const PostPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="py-5 px-5 md:px-12 lg:px-28 bg-gradient-to-b from-white to-red-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex justify-between items-center">
          <div className="w-[130px] sm:w-[160px] h-[60px] bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-0"></div>
        </div>
        
        <div className="text-center my-12">
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-6 mx-auto max-w-2xl"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-4 mx-auto max-w-xl w-3/4"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-8 mx-auto max-w-sm"></div>
        </div>
      </div>

      {/* Post Content Skeleton */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="h-96 w-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-6 md:p-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-1/2"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// PostContent component
async function PostContent({ slug }) {
  const post = await getPost(slug);
  if (!post) notFound();

  // Better RTL detection - check both title and content
  const isTitleRTL = isRTLText(post.title);
  const isContentRTL = isRTLText(post.content);
  const isUrdu = isTitleRTL || isContentRTL;

  console.log('🔄 Server-side RTL Detection:', {
    title: post.title,
    isTitleRTL,
    isContentRTL,
    finalIsRTL: isUrdu
  });

  return <PostClient post={post} slug={slug} isUrdu={isUrdu} />;
}

export default async function PostPage({ params }) {
  const slug = (await params).slug;
  
  return (
    <Suspense fallback={<PostPageSkeleton />}>
      <PostContent slug={slug} />
    </Suspense>
  )
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Al-Asr ( Islamic Service )',
    };
  }

  // Clean excerpt for description
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' || 
                      post.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' ||
                      'Islamic services and community programs from Al-Asr ( Islamic Service )';

  // Get featured image URL or default image
  const imageUrl = post.featuredImage?.node?.sourceUrl || 
                  'https://al-asr.centers.pk/og-image.jpg';

  const fullUrl = `https://al-asr.centers.pk/posts/${slug}`;

  return {
    title: `${post.title} | Al-Asr ( Islamic Service )`,
    description: cleanExcerpt,
    
    // Open Graph Meta Tags for WhatsApp/Facebook
    openGraph: {
      title: post.title,
      description: cleanExcerpt,
      url: fullUrl,
      siteName: 'Al-Asr ( Islamic Service )',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.node?.altText || post.title,
        },
      ],
      locale: 'ur_PK',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.node?.name || 'Al-Asr ( Islamic Service )'],
    },

    // Twitter Card Meta Tags
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: cleanExcerpt,
      images: [imageUrl],
    },

    // Additional Meta Tags
    alternates: {
      canonical: fullUrl,
    },
  };
}