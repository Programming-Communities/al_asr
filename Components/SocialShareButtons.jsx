// Components/SocialShareButtons.jsx
'use client'
import React, { useState } from 'react'

const SocialShareButtons = ({ title, slug, excerpt = '' }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Better WhatsApp sharing with delay to avoid rate limiting
  const shareOnWhatsApp = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    
    // Professional message format
    const text = `📖 ${title}\n\n${excerpt}\n\n🔗 Read more: ${url}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.open(whatsappUrl, '_blank');
    setIsSharing(false);
  };

  const shareOnFacebook = () => {
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    const text = `${title} - Al Asr Islamic Service`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyToClipboard = async () => {
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col space-y-4">
        {/* Share Title */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
            Share This Post
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Help spread the knowledge
          </p>
        </div>

        {/* Share Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* WhatsApp */}
          <button 
            onClick={shareOnWhatsApp}
            disabled={isSharing}
            className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200 group disabled:opacity-50"
            title="Share on WhatsApp"
            aria-label="Share on WhatsApp"
          >
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              {isSharing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.452"/>
                </svg>
              )}
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {isSharing ? 'Sharing...' : 'WhatsApp'}
            </span>
          </button>

          {/* Facebook */}
          <button 
            onClick={shareOnFacebook}
            className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 group"
            title="Share on Facebook"
            aria-label="Share on Facebook"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Facebook</span>
          </button>

          {/* Twitter */}
          <button 
            onClick={shareOnTwitter}
            className="flex flex-col items-center justify-center p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all duration-200 group"
            title="Share on Twitter"
            aria-label="Share on Twitter"
          >
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-sky-700 dark:text-sky-300">Twitter</span>
          </button>

          {/* Copy Link */}
          <button 
            onClick={copyToClipboard}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
            title="Copy link"
            aria-label="Copy link to clipboard"
          >
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              {copied ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>
        </div>

        {/* Quick Share Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Share this post with your friends and family
          </p>
        </div>
      </div>
    </div>
  );
}

export default SocialShareButtons;