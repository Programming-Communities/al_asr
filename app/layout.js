import { ThemeProvider } from "@/Components/theme-provider";
import "./globals.css";

export const metadata = {
  title: "Al-Asr ( Islamic Service )",
  description: "Al-Asr - Islamic Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* WhatsApp Sharing Meta Tags */}
        <meta property="og:url" content="https://al-asr.centers.pk" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Al-Asr ( Islamic Service )" />
        <meta
          property="og:description"
          content="Islamic Services, Calendar Events, and Community Programs"
        />
        <meta
          property="og:image"
          content="https://al-asr.centers.pk/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ur_PK" />

        {/* Prevent dark reader from modifying styles */}
        <meta name="darkreader-lock" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}