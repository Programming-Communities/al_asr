import "./globals.css";

export const metadata = {
  title: "Al Asr - Hussaini Calendar",
  description: "Al Asr Hussaini Calendar - Islamic Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Modern performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  const perfObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const navEntry = entries.find(entry => entry.entryType === 'navigation');
                    if (navEntry) {
                      const loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
                      console.log('✅ Page load time:', loadTime + 'ms');
                    }
                  });
                  perfObserver.observe({type: 'navigation', buffered: true});
                });
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}