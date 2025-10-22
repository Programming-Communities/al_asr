// app/robots.txt/route.js
export async function GET() {
  const baseUrl = 'https://al-asr.centers.pk'
  
  const robotsTxt = `
User-agent: *
Allow: /

# Block admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-json/

# Block Next.js internal routes
Disallow: /_next/
Disallow: /_vercel/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`.trim()

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}