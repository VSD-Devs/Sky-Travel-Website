'use client';

import { Search, Plane, Users, Calendar, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();
  const [searchType, setSearchType] = useState('flight');
  const [destination, setDestination] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Available destinations that we have built
  const availableDestinations = [
    { id: 'europe', name: 'Europe', path: '/destinations/europe' },
    { id: 'americas', name: 'Americas', path: '/destinations/americas' },
  ];

  // Filter destinations based on search input
  const filteredDestinations = destination.trim() !== '' 
    ? availableDestinations.filter(dest => 
        dest.name.toLowerCase().includes(destination.toLowerCase())
      )
    : [];

  const handleSearch = () => {
    // First check if the destination exactly matches one of our available destinations
    const exactMatch = availableDestinations.find(
      dest => dest.name.toLowerCase() === destination.toLowerCase()
    );
    
    if (exactMatch) {
      // If there's an exact match, go directly to that destination page
      router.push(exactMatch.path);
      return;
    }
    
    // Otherwise, use the original search functionality
    const searchParams = new URLSearchParams({
      type: searchType,
      destination,
      ...(searchType === 'flight' && { departureAirport }),
      departureDate,
      returnDate,
      adults,
      children
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  const handleDestinationClick = (path: string) => {
    router.push(path);
    setShowSuggestions(false);
  };

  return (
    <div className="relative h-auto min-h-[40vh] md:h-[75vh] w-full">
      <div className="absolute inset-0 h-full">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3"
          alt="Hero background"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/40 to-emerald-500/20" />
      </div>

      <div className="relative flex flex-col items-center justify-start pt-6 md:pt-20 px-4 pb-6">
        {/* Search Form with Embedded Header */}
        <div className="w-full max-w-xl md:max-w-3xl">
          <div className="backdrop-blur-md bg-white/95 rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {/* Form Header - Now visible on all devices */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 md:p-4 text-center">
              <h1 className="text-lg md:text-xl font-bold text-white mb-1">
                Plan Your Next Holiday
              </h1>
              <p className="text-sm md:text-base text-blue-100">
                Explore the world's most beautiful destinations
              </p>
            </div>

            {/* Form Content */}
            <div className="p-3 md:p-6 space-y-3">
              {/* Search Type Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setSearchType('flight')}
                  className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'flight'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span className="hidden md:inline">Flight Only</span>
                </button>
                <button
                  onClick={() => setSearchType('package')}
                  className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'package'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Plane className="w-4 h-4" />
                    <span className="text-xs">+</span>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="hidden md:inline ml-1">Flight + Hotel</span>
                </button>
              </div>

              {/* Destination and Departure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1 relative">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Plane className="w-4 h-4 mr-2" /> Destination
                  </label>
                  <Input
                    type="text"
                    placeholder="Where to? (e.g. Europe, Americas)"
                    className="w-full bg-white border-gray-200 text-gray-900 h-9"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      // Delay hiding suggestions to allow for clicks
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                  />
                  
                  {/* Destination Suggestions */}
                  {showSuggestions && filteredDestinations.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                      <ul className="max-h-60 overflow-auto">
                        {filteredDestinations.map(dest => (
                          <li key={dest.id}>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-150 flex items-center"
                              onClick={() => handleDestinationClick(dest.path)}
                            >
                              <span>{dest.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Plane className="w-4 h-4 mr-2" /> From
                  </label>
                  <Input
                    type="text"
                    placeholder="Departure airport"
                    className="w-full bg-white border-gray-200 text-gray-900 h-9"
                    value={departureAirport}
                    onChange={(e) => setDepartureAirport(e.target.value)}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" /> {searchType === 'flight' ? 'Depart' : 'Check-in'}
                  </label>
                  <Input
                    type="date"
                    className="w-full bg-white border-gray-200 text-gray-900 h-9"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" /> {searchType === 'flight' ? 'Return' : 'Check-out'}
                  </label>
                  <Input
                    type="date"
                    className="w-full bg-white border-gray-200 text-gray-900 h-9"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 mr-2" /> Adults
                  </label>
                  <select
                    className="w-full h-9 px-3 rounded-md bg-white border border-gray-200 text-gray-900"
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

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Users className="w-4 h-4 mr-2" /> Children
                  </label>
                  <select
                    className="w-full h-9 px-3 rounded-md bg-white border border-gray-200 text-gray-900"
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

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg transition-colors mt-2"
              >
                <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Search {searchType === 'flight' ? 'Flights' : 'Flights + Hotels'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}