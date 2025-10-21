// app/posts/[slug]/PostClient.jsx
'use client'
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/Components/Header';

// RTL Text Detection Function
function isRTLText(text) {
  if (!text) return false;
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
}

// Social Sharing Component
function PostSocialShareButtons({ title, slug, isRTL }) {
  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    const text = `📖 ${title}\n\nRead this amazing post from Al-Asr ( Islamic Service ):\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className={`flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
      <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
        Share this post:
      </span>
      
      <button 
        onClick={shareOnWhatsApp}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        title="Share on WhatsApp"
      >
        <span>📱</span>
        WhatsApp
      </button>
      
      <button 
        onClick={shareOnFacebook}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        title="Share on Facebook"
      >
        <span>🔵</span>
        Facebook
      </button>
    </div>
  );
}

// Post Meta Information Component
function PostMetaInfo({ post, isRTL }) {
  const readingTime = (content) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300`}>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">📖</span>
          <span>{readingTime(post.content)}</span>
        </div>
        
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">📅</span>
          <span>Published on {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</span>
        </div>
        
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">👤</span>
          <span>By {post.author?.node?.name || 'Admin'}</span>
        </div>
      </div>
      
      {post.categories.nodes.length > 0 && (
        <div className={`mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
            Categories:
          </span>
          {post.categories.nodes.map((category, index) => (
            <span 
              key={category.slug} 
              className={`inline-block bg-red-900 dark:bg-red-800 text-white text-xs px-3 py-1 rounded-full ${isRTL ? 'ml-2' : 'mr-2'} mb-2`}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Post Client Component
export default function PostClient({ post, slug, isUrdu }) {
  // Use the isUrdu prop from server-side detection
  const isTitleRTL = isUrdu !== undefined ? isUrdu : isRTLText(post.title);
  const isContentRTL = isRTLText(post.content);
  const currentIsRTL = isTitleRTL || isContentRTL;

  console.log('🔍 Post Language Detection:', {
    title: post.title,
    isUrduProp: isUrdu,
    isTitleRTL,
    isContentRTL,
    finalIsRTL: currentIsRTL
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="py-8">
        <article 
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          dir={currentIsRTL ? "rtl" : "ltr"}
        >
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

          <div className="p-6 md:p-8">
            <h1 
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight ${
                currentIsRTL ? 'text-right' : 'text-left'
              }`}
            >
              {post.title}
            </h1>

            <PostMetaInfo post={post} isRTL={currentIsRTL} />

            <div 
              className={`wp-content max-w-none text-gray-700 dark:text-gray-300 ${
                currentIsRTL ? 'urdu-arabic-content' : 'english-content'
              }`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-8">
              <PostSocialShareButtons title={post.title} slug={slug} isRTL={currentIsRTL} />
            </div>

            <div className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${currentIsRTL ? 'text-right' : 'text-left'}`}>
              <Link
                href="/"
                className={`inline-flex items-center text-red-900 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors ${
                  currentIsRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <svg 
                  className={`${currentIsRTL ? 'ml-2 rotate-180' : 'mr-2'} w-4 h-4`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Posts
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}