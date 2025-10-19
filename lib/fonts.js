// lib/fonts.js
import localFont from 'next/font/local';

// Only Jameel Noori Nastaleeq font - no Outfit fonts
export const jameelNoori = localFont({
  src: '../public/fonts/jameel-noori-nastaleeq.ttf',
  variable: '--font-jameel-noori',
  display: 'swap',
});

// No Outfit font - we'll use system fonts for English