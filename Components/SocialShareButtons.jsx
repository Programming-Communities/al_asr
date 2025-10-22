// Components/SocialShareButtons.jsx
'use client'
import React, { useState } from 'react'

const SocialShareButtons = ({ title, slug, excerpt = '' }) => {
  const [isSharing, setIsSharing] = useState(false);

  // Better WhatsApp sharing with delay to avoid rate limiting
  const shareOnWhatsApp = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    
    // Shorter message to avoid rate limiting
    const text = `📖 ${title}\n\nRead more: ${url}`;
    
    // Use api.whatsapp.com instead of wa.me (more reliable)
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    
    // Add small delay to prevent rapid clicks
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

  const shareOnInstagram = () => {
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Paste it in your Instagram story or post.');
    });
  };

  const copyToClipboard = () => {
    const url = `https://al-asr.centers.pk/posts/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-full mb-2">Share this post:</span>
      
      <button 
        onClick={shareOnWhatsApp}
        disabled={isSharing}
        className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors text-sm min-w-[120px] justify-center"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        {isSharing ? (
          <span className="animate-spin">⏳</span>
        ) : (
          <span>📱</span>
        )}
        {isSharing ? 'Sharing...' : 'WhatsApp'}
      </button>
      
      <button 
        onClick={shareOnFacebook}
        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm min-w-[120px] justify-center"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <span>🔵</span>
        Facebook
      </button>
      
      <button 
        onClick={shareOnTwitter}
        className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm min-w-[120px] justify-center"
        title="Share on Twitter"
        aria-label="Share on Twitter"
      >
        <span>🐦</span>
        Twitter
      </button>
      
      <button 
        onClick={copyToClipboard}
        className="flex items-center gap-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm min-w-[120px] justify-center"
        title="Copy link"
        aria-label="Copy link to clipboard"
      >
        <span>🔗</span>
        Copy Link
      </button>
    </div>
  );
}

export default SocialShareButtons