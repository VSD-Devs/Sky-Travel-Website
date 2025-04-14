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
            width={48}
            height={48}
            className="object-contain group-hover:scale-105 transition-transform duration-200"
            priority
          />
          <div className="flex flex-col">
            <span className="font-bold text-2xl text-blue-800">Sky Limit</span>
            <span className="text-xs font-semibold tracking-[0.2em] text-blue-800">LUXURY TRAVELS</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center justify-center flex-1 ml-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 text-[15px] font-medium text-gray-800 hover:text-blue-800 bg-white hover:bg-blue-50 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-800 rounded-lg transition-colors">
                  Flights
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] lg:w-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Embedded Header for Desktop Dropdown */}
                    <div className="bg-blue-800 p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1">
                        Flight Destinations
                      </h3>
                      <p className="text-sm text-blue-100">
                        Explore flights to popular destinations
                      </p>
                    </div>
                    
                    {/* Desktop Dropdown Content */}
                    <div className="grid grid-cols-2 gap-2 p-6">
                      <div>
                        <Link href="/flights/countries/france" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                                alt="France" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">France</h4>
                              <p className="text-sm text-gray-600">Paris, Nice, Lyon</p>
                            </div>
                          </a>
                        </Link>
                        
                        <Link href="/flights/countries/spain" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                                alt="Spain" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Spain</h4>
                              <p className="text-sm text-gray-600">Barcelona, Madrid, Malaga</p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      
                      <div>
                        <Link href="/flights/countries/italy" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                                alt="Italy" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Italy</h4>
                              <p className="text-sm text-gray-600">Rome, Venice, Milan</p>
                            </div>
                          </a>
                        </Link>
                        
                        <Link href="/flights/countries/greece" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                                alt="Greece" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Greece</h4>
                              <p className="text-sm text-gray-600">Athens, Santorini, Crete</p>
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 px-4 text-[15px] font-medium text-gray-800 hover:text-blue-800 bg-white hover:bg-blue-50 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-800 rounded-lg transition-colors">
                  Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] lg:w-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Embedded Header for Desktop Dropdown */}
                    <div className="bg-blue-800 p-4 text-center">
                      <h3 className="text-lg font-bold text-white mb-1">
                        Explore Destinations
                      </h3>
                      <p className="text-sm text-blue-100">
                        Discover your perfect getaway
                      </p>
                    </div>
                    
                    {/* Desktop Dropdown Content */}
                    <div className="grid grid-cols-2 gap-2 p-6">
                      <div>
                        <Link href="/destinations/europe" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="/images/europe-thumb.webp" 
                                alt="Europe" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Europe</h4>
                              <p className="text-sm text-gray-600">Rich history & culture</p>
                            </div>
                          </a>
                        </Link>
                        
                        <Link href="/destinations/asia" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="/images/asia-thumb.webp" 
                                alt="Asia" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Asia</h4>
                              <p className="text-sm text-gray-600">Ancient traditions</p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      
                      <div>
                        <Link href="/destinations/americas" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="/images/americas-thumb.webp" 
                                alt="Americas" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Americas</h4>
                              <p className="text-sm text-gray-600">Natural wonders</p>
                            </div>
                          </a>
                        </Link>
                        
                        <Link href="/destinations/oceania" legacyBehavior passHref>
                          <a className="group flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 shrink-0">
                              <img 
                                src="/images/oceania-thumb.webp" 
                                alt="Oceania" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-800 transition-colors">Oceania</h4>
                              <p className="text-sm text-gray-600">Island paradises</p>
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-800 hover:text-blue-800 bg-white hover:bg-blue-50 rounded-lg inline-flex items-center transition-colors">
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-800 hover:text-blue-800 bg-white hover:bg-blue-50 rounded-lg inline-flex items-center transition-colors">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/legal" legacyBehavior passHref>
                  <NavigationMenuLink className="h-10 px-4 text-[15px] font-medium text-gray-800 hover:text-blue-800 bg-white hover:bg-blue-50 rounded-lg inline-flex items-center transition-colors">
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
            className="hidden md:flex h-10 px-6 items-center justify-center bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-[15px] font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          >
            Plan Your Trip
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors relative z-50"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {/* Featured Flights Link at the top of mobile menu */}
            <div className="mb-6">
              <Link 
                href="/flights" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-center bg-blue-50 text-blue-800 font-medium rounded-lg transition-colors border border-blue-200 hover:bg-blue-100"
              >
                Flights
              </Link>
            </div>
          
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-800 px-4 mb-2">Destinations</p>
              <Link 
                href="/destinations/europe" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Europe
              </Link>
              <Link 
                href="/destinations/asia" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Asia
              </Link>
              <Link 
                href="/destinations/americas" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Americas
              </Link>
              <Link 
                href="/destinations/oceania" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Oceania
              </Link>
            </div>

            <div className="space-y-1">
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Contact
              </Link>
              <Link 
                href="/legal" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 active:bg-blue-200 rounded-lg transition-colors border-l-4 border-transparent hover:border-blue-500"
              >
                Legal
              </Link>
            </div>

            <div className="pt-4">
              <Link 
                href="/plan-trip"
                className="block w-full px-4 py-3 text-center bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-medium transition-colors"
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