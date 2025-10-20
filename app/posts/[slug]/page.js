// app/posts/[slug]/page.js
import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const client = new GraphQLClient('https://admin-al-asr.centers.pk/graphql');

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

// Detect if content is Urdu
function isUrduContent(text) {
  if (!text) return false;
  
  const cleanText = text.replace(/<[^>]*>/g, '');
  
  // Urdu/Arabic character ranges
  const urduRanges = [
    /[\u0600-\u06FF]/, // Arabic
    /[\u0750-\u077F]/, // Arabic Supplement
    /[\u08A0-\u08FF]/, // Arabic Extended-A
    /[\uFB50-\uFDFF]/, // Arabic Presentation Forms-A
    /[\uFE70-\uFEFF]/, // Arabic Presentation Forms-B
  ];
  
  // Count Urdu characters
  let urduCharCount = 0;
  let totalCharCount = 0;
  
  for (let char of cleanText) {
    if (urduRanges.some(regex => regex.test(char))) {
      urduCharCount++;
    }
    if (char.trim() !== '') {
      totalCharCount++;
    }
  }
  
  // If more than 30% characters are Urdu, consider it Urdu content
  return totalCharCount > 0 && (urduCharCount / totalCharCount) > 0.3;
}

// PostPageSkeleton component
const PostPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        {/* Featured Image Skeleton */}
        <div className="h-96 w-full bg-gray-300"></div>

        {/* Content Skeleton */}
        <div className="p-8">
          {/* Categories Skeleton */}
          <div className="mb-4">
            <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
          </div>

          {/* Title Skeleton */}
          <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-8 bg-gray-300 rounded mb-6 w-1/2"></div>

          {/* Meta Info Skeleton */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Back Button Skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="w-32 h-6 bg-gray-300 rounded float-right"></div>
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

  // Detect language
  const isUrdu = isUrduContent(post.content) || isUrduContent(post.title);
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <article 
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        dir={isUrdu ? "rtl" : "ltr"}
      >
        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative h-96 w-full">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {/* Categories */}
          <div className="mb-4 text-left">
            {post.categories.nodes.map((category) => (
              <span key={category.slug} className="inline-block bg-red-900 text-white text-sm px-3 py-1 rounded-full mr-2">
                {category.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${isUrdu ? 'text-right urdu-text' : 'text-left english-text'}`}>
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center text-gray-600 mb-6 border-b border-gray-200 pb-4">
            <span className="mr-4">📅 {formattedDate}</span>
            <span>👤 By {post.author?.node?.name || 'Admin'}</span>
          </div>

          {/* Content with proper font */}
          <div 
            className={`wp-content ${isUrdu ? 'urdu-text' : 'english-text'} max-w-none text-gray-700`}
            style={{ 
              direction: isUrdu ? 'rtl' : 'ltr',
              textAlign: isUrdu ? 'right' : 'left',
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-right">
            <Link
              href="/"
              className="inline-flex items-center text-red-900 hover:text-red-700 font-semibold"
            >
              Back to All Posts
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default async function PostPage({ params }) {
  return (
    <Suspense fallback={<PostPageSkeleton />}>
      <PostContent slug={params.slug} />
    </Suspense>
  )
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Al-Asr Hussaini Calendar`,
    description: post.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
  };
}