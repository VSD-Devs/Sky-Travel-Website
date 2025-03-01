import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sky Limit Travels - Discover Your Next Adventure',
  description: 'Luxury travel experiences and unforgettable adventures around the world. Expert travel planning, exclusive destinations, and personalised itineraries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <div className="pt-20">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}