'use client';

import { Search, Plane, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      destination,
      departureAirport,
      departureDate,
      returnDate,
      adults,
      children
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="relative min-h-[90vh] w-full">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3"
          alt="Hero background"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
      </div>
      
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/40 to-emerald-500/20" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          Plan Your Next Holiday
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          Explore the world's most beautiful destinations with our curated travel experiences
        </p>
        
        <div className="backdrop-blur-md bg-white/95 p-8 rounded-2xl shadow-lg w-full max-w-5xl border border-white/20 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 relative">
            <div className="space-y-2 group">
              <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                <Plane className="w-4 h-4 mr-2" /> Destination
              </label>
              <Input
                type="text"
                placeholder="Where would you like to go?"
                className="w-full bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 group">
              <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                <Plane className="w-4 h-4 mr-2" /> Departure Airport
              </label>
              <Input
                type="text"
                placeholder="Enter departure airport"
                className="w-full bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
              />
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                <Calendar className="w-4 h-4 mr-2" /> Departure Date
              </label>
              <Input
                type="date"
                className="w-full bg-white border-gray-200 text-gray-900 focus:border-blue-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                <Calendar className="w-4 h-4 mr-2" /> Return Date
              </label>
              <Input
                type="date"
                className="w-full bg-white border-gray-200 text-gray-900 focus:border-blue-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                <Users className="w-4 h-4 mr-2" /> Adults
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white border border-gray-200 text-gray-900 focus:border-blue-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Adult{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 group">
              <label className="flex items-center text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                <Users className="w-4 h-4 mr-2" /> Children (0-17)
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white border border-gray-200 text-gray-900 focus:border-blue-700 focus:ring-2 focus:ring-emerald-100 transition-colors"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} Child{num !== 1 ? 'ren' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center relative z-10">
            <Button 
              onClick={handleSearch}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Flights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}