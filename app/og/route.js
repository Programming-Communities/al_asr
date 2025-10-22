// app/og/route.js
import { NextResponse } from 'next/server';

// Remove edge runtime
export async function GET() {
  // Redirect to the PNG version
  return NextResponse.redirect('https://al-asr.centers.pk/og-image.png');
}