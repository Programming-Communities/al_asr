// app/layout.js
import { ThemeProvider } from "@/Components/theme-provider";
import "./globals.css";

const baseUrl = 'https://al-asr.centers.pk';

export const metadata = {
  title: "Al-Asr ( Islamic Service )",
  description: "Islamic Services, Calendar Events, and Community Programs",
  metadataBase: new URL(baseUrl),
  
  openGraph: {
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    url: baseUrl,
    siteName: "Al-Asr Islamic Service",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Al-Asr Islamic Service",
        type: 'image/png',
      },
    ],
    locale: "ur_PK",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    images: ['/og-image.png'],
  },
  
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://admin-al-asr.centers.pk" />
        
        {/* Additional explicit OG image tags */}
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Al-Asr Islamic Service" />
        
        {/* Twitter Card image */}
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
        <meta name="twitter:image:alt" content="Al-Asr Islamic Service" />
        
        {/* Optional Facebook App ID */}
        <meta property="fb:app_id" content="123456789" />
        
        {/* Prevent dark reader from modifying styles */}
        <meta name="darkreader-lock" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider>
          <main role="main" id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}