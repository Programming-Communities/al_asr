// app/posts/[slug]/page.js - Updated detection
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
        id title content date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name } }
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
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Al-Asr Hussaini Calendar`,
    description: post.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.node?.name || 'Al-Asr'],
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    },
  };
}