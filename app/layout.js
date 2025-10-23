// app/layout.js
import { ThemeProvider } from "@/Components/theme-provider";
import "./globals.css"; // ✅ Let Next.js handle CSS injection safely

const baseUrl = "https://al-asr.centers.pk";

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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Al-Asr Islamic Service",
        type: "image/png",
      },
    ],
    locale: "ur_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    images: ["/og-image.png"],
  },

  robots: { index: true, follow: true },
  alternates: { canonical: baseUrl },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ur"
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* ✅ Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* ✅ Disable Apple Touch (no missing icon 404) */}
        <meta name="apple-mobile-web-app-capable" content="no" />

        {/* ✅ Preconnect + Prefetch */}
        <link
          rel="preconnect"
          href="https://admin-al-asr.centers.pk"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://admin-al-asr.centers.pk" />

        {/* ✅ Preload critical logo image */}
        {/* <link rel="preload" href="/alasr.webp" as="image" fetchPriority="high" /> */}

        {/* ✅ Inline tiny critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                margin: 0;
                padding: 0;
                font-family: system-ui, -apple-system, sans-serif;
                background-color: #ffffff;
                color: #111827;
                -webkit-font-smoothing: antialiased;
              }
              .min-h-screen { min-height: 100vh; }
            `,
          }}
        />

        {/* ✅ OG + Twitter Meta */}
        <meta property="og:image" content={`${baseUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Al-Asr Islamic Service" />
        <meta name="twitter:image" content={`${baseUrl}/og-image.png`} />
        <meta name="twitter:image:alt" content="Al-Asr Islamic Service" />

        {/* ✅ Prevent dark-mode filter */}
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
