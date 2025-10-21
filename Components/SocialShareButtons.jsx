// Components/SocialShareButtons.jsx
'use client'
import React from 'react'

const SocialShareButtons = ({ title, slug, excerpt = '' }) => {
  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    const text = excerpt 
      ? `📖 ${title}\n\n${excerpt}\n\nRead more: ${url}`
      : `📖 ${title}\n\nRead this amazing post from Al Asr Hussaini Calendar:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    const text = `${title} - Al Asr Hussaini Calendar`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnInstagram = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! Paste it in your Instagram story or post.');
    });
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Share this post:</span>
      
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
      
      <button 
        onClick={shareOnTwitter}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
        title="Share on Twitter"
      >
        <span>🐦</span>
        Twitter
      </button>
      
      <button 
        onClick={shareOnInstagram}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
        title="Share on Instagram"
      >
        <span>📸</span>
        Instagram
      </button>
    </div>
  );
}

export default SocialShareButtons