<head>
  {/* ✅ Basic Meta */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />

  {/* ✅ Disable Apple Touch (no missing icon 404) */}
  {/* ❌ Optional — safe to remove */}
  {/* <meta name="apple-mobile-web-app-capable" content="no" /> */}

  {/* ✅ Preconnect + Prefetch */}
  <link
    rel="preconnect"
    href="https://admin-al-asr.centers.pk"
    crossOrigin="anonymous"
  />
  <link rel="dns-prefetch" href="https://admin-al-asr.centers.pk" />

  {/* ✅ Preload critical logo image */}
  {/* ❌ You don’t need this if Next/Image handles priority */}
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

  {/* ✅ Preload render-blocking CSS */}
  <link
    rel="preload"
    href="/_next/static/css/5f869f97eabd97c2.css"
    as="style"
    onLoad="this.onload=null;this.rel='stylesheet'"
  />
  <noscript>
    <link
      rel="stylesheet"
      href="/_next/static/css/5f869f97eabd97c2.css"
    />
  </noscript>

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
