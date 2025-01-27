'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50">
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
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-700">LUXURY TRAVELS</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center justify-center flex-1 ml-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-700 rounded-lg transition-colors">
                  Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] lg:w-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Embedded Header for Desktop Dropdown */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1">
                        Explore Destinations
                      </h3>
                      <p className="text-sm text-blue-100">
                        Discover your perfect getaway
                      </p>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/destinations/europe" className="group block space-y-1.5 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Europe</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Historic cities and stunning landscapes</p>
                        </Link>
                        <Link href="/destinations/asia" className="group block space-y-1.5 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Asia</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Ancient cultures and traditions</p>
                        </Link>
                        <Link href="/destinations/americas" className="group block space-y-1.5 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Americas</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">From Arctic to tropical paradise</p>
                        </Link>
                        <Link href="/destinations/oceania" className="group block space-y-1.5 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">Oceania</h4>
                            <svg className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                          </div>
                          <p className="text-sm text-gray-500">Island paradises and adventures</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 rounded-lg inline-flex items-center transition-colors">
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 rounded-lg inline-flex items-center transition-colors">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/legal" legacyBehavior passHref>
                  <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-700 hover:text-blue-700 bg-white hover:bg-blue-50 rounded-lg inline-flex items-center transition-colors">
                    Legal
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/plan-trip"
            className="hidden md:flex h-10 px-6 items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-[15px] font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            Plan Your Trip
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors relative z-50"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0' }}
      >
        <div className="pt-24 px-6 h-full overflow-y-auto">
          <nav className="space-y-6">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-700 px-4 mb-2">Destinations</p>
              <Link 
                href="/destinations/europe" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Europe
              </Link>
              <Link 
                href="/destinations/asia" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Asia
              </Link>
              <Link 
                href="/destinations/americas" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Americas
              </Link>
              <Link 
                href="/destinations/oceania" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Oceania
              </Link>
            </div>

            <div className="space-y-1">
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Contact
              </Link>
              <Link 
                href="/legal" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Legal
              </Link>
            </div>

            <div className="pt-4">
              <Link 
                href="/plan-trip"
                className="block w-full px-4 py-3 text-center bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Plan Your Trip
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 