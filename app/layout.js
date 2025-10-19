// app/layout.js
import { jameelNoori } from '@/lib/fonts';
import "./globals.css";

export const metadata = {
  title: "Al Asr - Hussaini Calendar",
  description: "Al Asr Hussaini Calendar - Islamic Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" className={jameelNoori.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}