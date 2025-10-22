// app/og-image.png/route.js
import { ImageResponse } from 'next/og';

// Remove edge runtime - use default nodejs runtime
export const contentType = 'image/png';
// Remove: export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#7f1d1d',
            background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          <div 
            style={{ 
              fontSize: 72, 
              fontWeight: 'bold', 
              marginBottom: 30,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            🕌 Al-Asr
          </div>
          <div 
            style={{ 
              fontSize: 42, 
              fontWeight: 'bold',
              marginBottom: 20,
              opacity: 0.95
            }}
          >
            Islamic Service
          </div>
          <div 
            style={{ 
              fontSize: 28, 
              opacity: 0.9,
              marginBottom: 10
            }}
          >
            Services • Calendar • Community
          </div>
          <div 
            style={{ 
              fontSize: 24, 
              opacity: 0.8,
              marginTop: 30,
              padding: '10px 20px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px'
            }}
          >
            al-asr.centers.pk
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
}