import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sky Limit Travels - Discover Your Next Adventure',
  description: 'Luxury travel experiences and unforgettable adventures around the world. Expert travel planning, exclusive destinations, and personalized itineraries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-blue-100/30">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 group">
              <Image 
                src="/logo.png"
                alt="Sky Limit Travels Logo"
                width={45}
                height={45}
                className="object-contain group-hover:scale-105 transition-transform duration-200"
                priority
              />
              <div className="flex flex-col">
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Sky Limit</span>
                <span className="text-xs font-semibold tracking-[0.2em] text-blue-700"> LUXURY TRAVELS</span>
              </div>
            </Link>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-transparent hover:bg-blue-50/80 data-[state=open]:bg-blue-50/80 data-[state=open]:text-blue-700 rounded-lg transition-colors">
                    Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] lg:w-[600px] p-4 bg-white rounded-xl shadow-lg border border-blue-100/50">
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/destinations/europe" className="group block space-y-1.5 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Europe</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Historic cities and stunning landscapes</p>
                        </Link>
                        <Link href="/destinations/asia" className="group block space-y-1.5 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Asia</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Ancient cultures and traditions</p>
                        </Link>
                        <Link href="/destinations/americas" className="group block space-y-1.5 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Americas</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">From Arctic to tropical paradise</p>
                        </Link>
                        <Link href="/destinations/oceania" className="group block space-y-1.5 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Oceania</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Island paradises and adventures</p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-transparent hover:bg-blue-50/80 data-[state=open]:bg-blue-50/80 data-[state=open]:text-blue-700 rounded-lg transition-colors">
                    Experiences
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4 bg-white rounded-xl shadow-lg border border-blue-100/50">
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/experiences/luxury" className="group block space-y-1.5 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Luxury Escapes</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">5-star resorts and private villas</p>
                        </Link>
                        <Link href="/experiences/adventure" className="group block space-y-1.5 p-3 rounded-lg hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-white transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Adventures</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Thrilling outdoor experiences</p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-transparent hover:bg-blue-50/80 rounded-lg inline-flex items-center transition-colors">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-transparent hover:bg-blue-50/80 rounded-lg inline-flex items-center transition-colors">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Link 
                href="/plan-trip"
                className="hidden md:flex h-10 px-6 items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-[15px] font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
              >
                Plan Your Trip
              </Link>
              <button className="md:hidden p-2 hover:bg-blue-50/80 rounded-lg transition-colors">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}