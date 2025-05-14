'use client';

import { Search, Plane, Users, Calendar, ArrowRight, Globe, MapPin, Clock, ArrowRightLeft, X, Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { airports, Airport, extractIataCode } from '@/data/airports';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

// Define types for destination items
interface RegionDestination {
  id: string;
  name: string;
  path: string;
}

interface AirportDestination {
  id: string;
  name: string;
  iataCode: string;
  path: string;
}

type Destination = RegionDestination | AirportDestination;

// Country flag emojis
const countryFlags: Record<string, string> = {
  'spain': '🇪🇸',
  'italy': '🇮🇹',
  'greece': '🇬🇷',
  'turkey': '🇹🇷',
  'france': '🇫🇷',
  'croatia': '🇭🇷',
  'portugal': '🇵🇹',
  'europe': '🇪🇺',
  'americas': '🌎',
};

// Available region destinations
const availableRegions: RegionDestination[] = [
  { id: 'europe', name: 'Europe', path: '/destinations/europe' },
  { id: 'americas', name: 'Americas', path: '/destinations/americas' },
  { id: 'spain', name: 'Spain', path: '/flights/countries/spain' },
  { id: 'italy', name: 'Italy', path: '/flights/countries/italy' },
  { id: 'greece', name: 'Greece', path: '/flights/countries/greece' },
  { id: 'turkey', name: 'Turkey', path: '/flights/countries/turkey' },
  { id: 'france', name: 'France', path: '/flights/countries/france' },
  { id: 'croatia', name: 'Croatia', path: '/flights/countries/croatia' },
  { id: 'portugal', name: 'Portugal', path: '/flights/countries/portugal' },
];

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [destinationIataCode, setDestinationIataCode] = useState('');
  const [departureAirport, setDepartureAirport] = useState('LHR');
  const [departureAirportDisplay, setDepartureAirportDisplay] = useState('London, United Kingdom - Heathrow Airport (LHR)');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showDepartureAirportSuggestions, setShowDepartureAirportSuggestions] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [validDestination, setValidDestination] = useState(false);
  const [tripType, setTripType] = useState<'return' | 'one-way'>('return');
  
  // Set default dates on component mount
  useEffect(() => {
    // Set default departure date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDepartureDate(tomorrow.toISOString().split('T')[0]);
    
    // Set default return date to 7 days after departure
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    setReturnDate(nextWeek.toISOString().split('T')[0]);
  }, []);

  // Filter destinations based on search input
  const filteredDestinations = destination.trim() !== '' 
    ? availableRegions
        .filter(region => 
          region.name.toLowerCase().includes(destination.toLowerCase())
        )
        .concat(
          airports
            .filter(airport => 
              airport.name.toLowerCase().includes(destination.toLowerCase()) ||
              airport.city.toLowerCase().includes(destination.toLowerCase()) ||
              airport.iataCode.toLowerCase().includes(destination.toLowerCase()) ||
              airport.country.toLowerCase().includes(destination.toLowerCase())
            )
            .map(airport => ({
              id: airport.id,
              name: `${airport.city}, ${airport.country} - ${airport.name} (${airport.iataCode})`,
              iataCode: airport.iataCode,
              path: `/search?destination=${airport.iataCode}&departureAirport=${departureAirport}&type=flight`
            } as AirportDestination))
        )
    : [
        // Show popular destinations by default
        ...availableRegions.slice(0, 5)
      ];
      
  // Group destination airports by country for "All airports in country" option
  const filteredAirportsForDestination = destination.trim() !== '' 
    ? airports.filter(airport => 
        airport.name.toLowerCase().includes(destination.toLowerCase()) ||
        airport.city.toLowerCase().includes(destination.toLowerCase()) ||
        airport.iataCode.toLowerCase().includes(destination.toLowerCase()) ||
        airport.country.toLowerCase().includes(destination.toLowerCase())
      )
    : [];
    
  // Group airports by country
  const destinationAirportsByCountry: Record<string, typeof airports> = {};
  const destinationAirportsByCity: Record<string, typeof airports> = {};
  
  // Build country and city groups for destination
  filteredAirportsForDestination.forEach(airport => {
    // Group by country
    const countryKey = airport.country;
    if (!destinationAirportsByCountry[countryKey]) {
      destinationAirportsByCountry[countryKey] = [];
    }
    destinationAirportsByCountry[countryKey].push(airport);
    
    // Group by city
    const cityKey = `${airport.city}-${airport.country}`;
    if (!destinationAirportsByCity[cityKey]) {
      destinationAirportsByCity[cityKey] = [];
    }
    destinationAirportsByCity[cityKey].push(airport);
  });
  
  // Create all-airports options for countries
  const allCountryDestinationOptions = Object.keys(destinationAirportsByCountry)
    .filter(country => destinationAirportsByCountry[country].length > 1) // Only for countries with multiple airports
    .map(countryKey => ({
      id: `all-dest-country-${countryKey}`,
      name: `${countryKey} (All airports)`,
      iataCode: countryKey.substring(0, 3).toUpperCase() + 'C', // Create a pseudo code with C suffix for countries
      path: `/search?destination=${countryKey.substring(0, 3).toUpperCase()}C&departureAirport=${departureAirport}&type=flight`,
      isCountry: true
    } as AirportDestination & { isCountry: boolean }));
    
  // Create all-airports options for cities with multiple airports
  const citiesWithMultipleDestinationAirports = Object.keys(destinationAirportsByCity)
    .filter(cityKey => destinationAirportsByCity[cityKey].length > 1);
    
  const allCityDestinationOptions = citiesWithMultipleDestinationAirports
    .map(cityKey => {
      const [city, country] = cityKey.split('-');
      return {
        id: `all-dest-city-${cityKey}`,
        name: `${city}, ${country} (All airports)`,
        iataCode: city.substring(0, 3).toUpperCase() + 'A', // Create a pseudo code with A suffix for cities
        path: `/search?destination=${city.substring(0, 3).toUpperCase()}A&departureAirport=${departureAirport}&type=flight`,
        isCity: true
      } as AirportDestination & { isCity: boolean };
    });
  
  // Combine all destination options and sort appropriately
  const combinedDestinations = [
    ...allCountryDestinationOptions,
    ...allCityDestinationOptions,
    ...filteredDestinations
  ];
  
  // Sort options to show country options first, then city options, then other destinations
  const sortedDestinations = destination.trim() !== '' 
    ? combinedDestinations.sort((a, b) => {
        // Country "All airports" options first
        if ('isCountry' in a && !('isCountry' in b)) return -1;
        if (!('isCountry' in a) && 'isCountry' in b) return 1;
        
        // City "All airports" options next
        if ('isCity' in a && !('isCity' in b) && !('isCountry' in b)) return -1;
        if (!('isCity' in a) && !('isCountry' in a) && 'isCity' in b) return 1;
        
        // Then sort by name
        return a.name.localeCompare(b.name);
      })
    : availableRegions.slice(0, 5); // Show just regions when no search input

  // Filter departure airports based on search input
  const filteredDepartureAirports = departureAirportDisplay.trim() !== '' 
    ? airports.filter(airport => 
        airport.name.toLowerCase().includes(departureAirportDisplay.toLowerCase()) ||
        airport.city.toLowerCase().includes(departureAirportDisplay.toLowerCase()) ||
        airport.country.toLowerCase().includes(departureAirportDisplay.toLowerCase()) ||
        airport.iataCode.toLowerCase().includes(departureAirportDisplay.toLowerCase())
      )
    : airports.filter(airport => ['LHR', 'LGW', 'MAN', 'EDI', 'BHX'].includes(airport.iataCode));

  // Group departure airports by city to identify cities with multiple airports
  const citiesWithMultipleAirports = new Set<string>();
  const airportsByCity: Record<string, typeof airports> = {};
  // Group airports by country
  const airportsByCountry: Record<string, typeof airports> = {};
  
  // Build city and country groups
  filteredDepartureAirports.forEach(airport => {
    // Group by city
    const cityKey = `${airport.city}-${airport.country}`;
    if (!airportsByCity[cityKey]) {
      airportsByCity[cityKey] = [];
    }
    airportsByCity[cityKey].push(airport);
    
    // If there are now 2 or more airports for this city, add it to the set
    if (airportsByCity[cityKey].length >= 2) {
      citiesWithMultipleAirports.add(cityKey);
    }
    
    // Group by country
    const countryKey = airport.country;
    if (!airportsByCountry[countryKey]) {
      airportsByCountry[countryKey] = [];
    }
    airportsByCountry[countryKey].push(airport);
  });
  
  // Create all-airports options for multi-airport cities
  const allAirportsOptions = Array.from(citiesWithMultipleAirports).map(cityKey => {
    const cityAirports = airportsByCity[cityKey];
    const [city, country] = cityKey.split('-');
    return {
      id: `all-${cityKey}`,
      iataCode: city.substring(0, 3).toUpperCase() + 'A', // Create a pseudo code with A suffix for cities
      name: `All airports`,
      city,
      country,
      isAllAirports: true
    };
  });
  
  // Create all-airports options for each country
  const allCountryAirportsOptions = Object.keys(airportsByCountry).map(countryKey => {
    return {
      id: `all-country-${countryKey}`,
      iataCode: countryKey.substring(0, 3).toUpperCase() + 'C', // Create a pseudo code with C suffix for countries
      name: `All airports in ${countryKey}`,
      city: '', // Empty city since this is country-level
      country: countryKey,
      isAllAirports: true,
      isCountry: true
    };
  });
  
  // Combine the regular airports with the all-airports options
  const combinedDepartureOptions = [...allCountryAirportsOptions, ...allAirportsOptions, ...filteredDepartureAirports];
  
  // Sort options to show country options first, then city "All airports", then by city name
  const sortedDepartureOptions = combinedDepartureOptions.sort((a, b) => {
    // Always put country "All airports" options first
    if (a.isCountry && !b.isCountry) return -1;
    if (!a.isCountry && b.isCountry) return 1;
    
    // Then put city "All airports" options
    if (a.isAllAirports && !a.isCountry && !b.isAllAirports) return -1;
    if (!a.isAllAirports && b.isAllAirports && !b.isCountry) return 1;
    
    // Then sort by country, then by city name
    if (a.country !== b.country) return a.country.localeCompare(b.country);
    return a.city.localeCompare(b.city);
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!destination) {
      errors.destination = 'Please enter a destination';
    } else if (!validDestination && !destinationIataCode && !isValidRegionOrAirport()) {
      errors.destination = 'Please select a valid destination from the list';
    }
    
    if (!departureAirport) {
      errors.departureAirport = 'Please enter a departure airport';
    }
    
    if (!departureDate) {
      errors.departureDate = 'Please select a departure date';
    }
    
    // Check if return date is before departure date
    if (tripType === 'return' && returnDate && new Date(returnDate) < new Date(departureDate)) {
      errors.returnDate = 'Return date must be after departure date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Check if the input matches a valid region or airport
  const isValidRegionOrAirport = () => {
    // Check for exact region match
    const regionMatch = availableRegions.find(
      region => region.name.toLowerCase() === destination.toLowerCase()
    );
    
    if (regionMatch) return true;
    
    // Check for airport match (either by name, city or IATA code)
    const extractedCode = extractIataCode(destination);
    if (extractedCode) return true;
    
    const airportMatch = airports.find(
      airport => 
        airport.name.toLowerCase().includes(destination.toLowerCase()) ||
        airport.city.toLowerCase().includes(destination.toLowerCase()) ||
        airport.iataCode.toLowerCase() === destination.toLowerCase()
    );
    
    return !!airportMatch;
  };

  const handleSearch = () => {
    if (!validateForm()) {
      return;
    }
    
    // Check if the destination exactly matches one of our available region destinations
    const exactRegionMatch = availableRegions.find(
      region => region.name.toLowerCase() === destination.toLowerCase()
    );
    
    if (exactRegionMatch) {
      // If there's an exact match with a region, go directly to that destination page
      router.push(exactRegionMatch.path);
      return;
    }
    
    // Determine the destination IATA code
    let finalDestinationCode = destinationIataCode;
    
    // If we don't have a saved IATA code, try to extract it or find an airport match
    if (!finalDestinationCode) {
      // First try to extract from the input (e.g., "London (LHR)")
      const extractedCode = extractIataCode(destination);
      if (extractedCode) {
        finalDestinationCode = extractedCode;
      } else {
        // Try to find a matching airport
        const airportMatch = airports.find(
          airport => 
            airport.name.toLowerCase().includes(destination.toLowerCase()) ||
            airport.city.toLowerCase().includes(destination.toLowerCase()) ||
            airport.iataCode.toLowerCase() === destination.toLowerCase()
        );
        
        if (airportMatch) {
          finalDestinationCode = airportMatch.iataCode;
        } else {
          // If still no match, use the input as-is (API will handle validation)
          finalDestinationCode = destination.toUpperCase();
        }
      }
    }

    // Build search parameters for the flight search
    const searchParams = new URLSearchParams({
      type: 'flight',
      departureAirport,
      destination: finalDestinationCode,
      departureDate,
      ...(tripType === 'return' && returnDate && { returnDate }),
      adults,
      children
    });
    
    router.push(`/search?${searchParams.toString()}`);
  };

  // Handle clicking on a destination suggestion
  const handleDestinationClick = (item: Destination & { isCountry?: boolean, isCity?: boolean }) => {
    if (!('iataCode' in item)) {
      // It's a region destination
      router.push(item.path);
    } else {
      // It's an airport, country, or city option
      if (item.isCountry) {
        // It's an "All airports in Country" option
        setDestination(`${item.name}`);
      } else if (item.isCity) {
        // It's an "All airports in City" option
        setDestination(`${item.name}`);
      } else {
        // Regular airport
        setDestination(item.name);
      }
      
      setDestinationIataCode(item.iataCode);
      setValidDestination(true);
      setShowDestinationSuggestions(false);
      
      if (formErrors.destination) {
        setFormErrors({ ...formErrors, destination: '' });
      }
    }
  };

  // Handle clicking on a departure airport suggestion
  const handleDepartureAirportClick = (airport: any) => {
    if (airport.isCountry) {
      // For "All airports in Country" option
      setDepartureAirport(airport.iataCode);
      setDepartureAirportDisplay(`${airport.country} (All airports)`);
    } else if (airport.isAllAirports) {
      // For "All airports in City" option
      setDepartureAirport(airport.iataCode);
      setDepartureAirportDisplay(`${airport.city}, ${airport.country} (All airports)`);
    } else {
      // For regular airports
      setDepartureAirport(airport.iataCode);
      setDepartureAirportDisplay(`${airport.city}, ${airport.country} - ${airport.name} (${airport.iataCode})`);
    }
    
    setShowDepartureAirportSuggestions(false);
    
    if (formErrors.departureAirport) {
      setFormErrors({ ...formErrors, departureAirport: '' });
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for min date attribute
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Clear destination input
  const clearDestination = () => {
    setDestination('');
    setDestinationIataCode('');
    setValidDestination(false);
  };

  // Clear departure airport input
  const clearDepartureAirport = () => {
    setDepartureAirportDisplay('');
    setDepartureAirport('');
  };

  return (
    <div className="relative w-full min-h-[650px] flex flex-col items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900/70 to-blue-950/80">
        <Image
          src="/assets/images/hero-bg.jpg"
          alt="Travel background"
          fill
          priority
          className="object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      <div className="relative flex flex-col items-center justify-start pt-6 md:pt-14 px-4 pb-6 z-10 w-full max-w-5xl mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Find Your Perfect Flight
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Search and compare flights to hundreds of destinations worldwide
          </p>
        </div>
        
        {/* Search Form */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Trip Type Selector */}
            <div className="p-4 border-b border-gray-200">
              <Tabs 
                defaultValue="return" 
                onValueChange={(value) => setTripType(value as 'return' | 'one-way')} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100">
                  <TabsTrigger 
                    value="return" 
                    className="rounded-md text-sm md:text-base py-2 transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Return
                  </TabsTrigger>
                  <TabsTrigger 
                    value="one-way" 
                    className="rounded-md text-sm md:text-base py-2 transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    One Way
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Form Content */}
            <div className="p-5 md:p-6 space-y-5">
              {/* From and To - Side by Side on Larger Screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From - Departure Airport */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" /> 
                    Flying from
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 ml-1 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-white p-2 shadow-lg rounded-md border">
                          <p className="text-sm text-gray-700">Enter a city, airport name or 3-letter code (e.g. London, Heathrow, or LHR)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="City or airport (e.g., London or LHR)"
                      className={`w-full bg-white border-gray-200 text-gray-900 h-12 pl-10 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                        formErrors.departureAirport ? 'border-red-500 focus:ring-red-200' : ''
                      }`}
                      value={departureAirportDisplay}
                      onChange={(e) => {
                        setDepartureAirportDisplay(e.target.value);
                        setShowDepartureAirportSuggestions(true);
                        if (formErrors.departureAirport) {
                          setFormErrors({ ...formErrors, departureAirport: '' });
                        }
                      }}
                      onFocus={() => setShowDepartureAirportSuggestions(true)}
                      onBlur={() => {
                        // Delay hiding suggestions to allow for clicks
                        setTimeout(() => setShowDepartureAirportSuggestions(false), 200);
                      }}
                      aria-label="Departure airport"
                    />
                    <Plane className="h-5 w-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2 -rotate-45" />
                    {departureAirportDisplay && (
                      <button 
                        onClick={clearDepartureAirport} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear departure airport"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {formErrors.departureAirport && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.departureAirport}</p>
                  )}
                  
                  {/* Airport Suggestions Dropdown */}
                  {showDepartureAirportSuggestions && sortedDepartureOptions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                      <p className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-b">Airports and countries:</p>
                      <ul className="max-h-60 overflow-auto">
                        {sortedDepartureOptions.slice(0, 8).map((airport) => (
                          <li key={airport.id}>
                            <button
                              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center ${
                                airport.isCountry ? "bg-green-50/50" : (airport.isAllAirports ? "bg-blue-50/50" : "")
                              }`}
                              onClick={() => handleDepartureAirportClick(airport)}
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                {airport.isCountry ? (
                                  <Globe className="w-5 h-5 text-green-600" />
                                ) : airport.isAllAirports ? (
                                  <Globe className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                                    <Plane className="w-4 h-4 text-blue-600 -rotate-45" />
                                  </div>
                                )}
                              </div>
                              <div>
                                {airport.isCountry ? (
                                  <div className="font-medium">{airport.country} <span className="text-green-600">(All airports)</span></div>
                                ) : airport.isAllAirports ? (
                                  <div className="font-medium">{airport.city}, {airport.country} <span className="text-blue-600">(All airports)</span></div>
                                ) : (
                                  <>
                                    <div className="font-medium">{airport.city}</div>
                                    <div className="text-xs text-gray-500">
                                      <span className="font-semibold">{airport.iataCode}</span> • {airport.name}, {airport.country}
                                    </div>
                                  </>
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* To - Destination */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" /> 
                    Flying to
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 ml-1 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-white p-2 shadow-lg rounded-md border">
                          <p className="text-sm text-gray-700">Enter a city, country, or airport (e.g. Paris, Greece, CDG)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Country, city or airport (e.g., Spain or CDG)"
                      className={`w-full bg-white border-gray-200 text-gray-900 h-12 pl-10 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                        formErrors.destination ? 'border-red-500 focus:ring-red-200' : ''
                      }`}
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setValidDestination(false);
                        setDestinationIataCode('');
                        setShowDestinationSuggestions(true);
                        if (formErrors.destination) {
                          setFormErrors({ ...formErrors, destination: '' });
                        }
                      }}
                      onFocus={() => setShowDestinationSuggestions(true)}
                      onBlur={() => {
                        // Delay hiding suggestions to allow for clicks
                        setTimeout(() => setShowDestinationSuggestions(false), 200);
                      }}
                      aria-label="Destination"
                    />
                    <Globe className="h-5 w-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    {destination && (
                      <button 
                        onClick={clearDestination} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear destination"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {formErrors.destination && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.destination}</p>
                  )}
                  
                  {/* Destination Suggestions */}
                  {((showDestinationSuggestions && sortedDestinations.length > 0) || (!destination.trim() && showDestinationSuggestions)) && (
                    <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                      <p className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-b">Countries and cities:</p>
                      <ul className="max-h-60 overflow-auto">
                        {sortedDestinations.map((dest) => (
                          <li key={dest.id}>
                            <button
                              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center ${
                                'isCountry' in dest ? "bg-green-50/50" : ('isCity' in dest ? "bg-blue-50/50" : "")
                              }`}
                              onClick={() => handleDestinationClick(dest)}
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                {'isCountry' in dest ? (
                                  <Globe className="w-5 h-5 text-green-600" />
                                ) : 'isCity' in dest ? (
                                  <Globe className="w-5 h-5 text-blue-600" />
                                ) : 'iataCode' in dest ? (
                                  <Plane className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <span className="text-base">{countryFlags[dest.id.toLowerCase()] || '🌍'}</span>
                                )}
                              </div>
                              <div>
                                {'isCountry' in dest ? (
                                  <div className="font-medium">{dest.name}</div>
                                ) : 'isCity' in dest ? (
                                  <div className="font-medium">{dest.name}</div>
                                ) : 'iataCode' in dest ? (
                                  <>
                                    <div className="font-medium">{dest.name.split(' - ')[0]}</div>
                                    <div className="text-xs text-gray-500">
                                      <span className="font-semibold">{dest.iataCode}</span> • {dest.name.split(' - ')[1]?.replace(/\([^)]*\)/g, '').trim()}
                                    </div>
                                  </>
                                ) : (
                                  <div className="font-medium flex items-center">
                                    {dest.name}
                                    <Badge className="ml-2 text-xs bg-blue-100 text-blue-800 hover:bg-blue-200">Country</Badge>
                                  </div>
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Dates and Passengers - Responsive Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Dates */}
                <div className={tripType === 'return' 
                  ? 'md:col-span-8 grid grid-cols-2 gap-4' 
                  : 'md:col-span-6 grid grid-cols-1 gap-4'}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="departure-date">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Departure date
                    </label>
                    <Input
                      id="departure-date"
                      type="date"
                      className={`w-full h-12 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                        formErrors.departureDate ? 'border-red-500 focus:ring-red-200' : ''
                      }`}
                      min={getTomorrowDate()}
                      value={departureDate}
                      onChange={(e) => {
                        setDepartureDate(e.target.value);
                        if (formErrors.departureDate) {
                          setFormErrors({ ...formErrors, departureDate: '' });
                        }
                        // If return date is before the selected departure date, update it
                        if (returnDate && new Date(e.target.value) > new Date(returnDate)) {
                          const newReturnDate = new Date(e.target.value);
                          newReturnDate.setDate(newReturnDate.getDate() + 7);
                          setReturnDate(newReturnDate.toISOString().split('T')[0]);
                        }
                      }}
                      aria-label="Departure date"
                    />
                    {formErrors.departureDate && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.departureDate}</p>
                    )}
                  </div>

                  {tripType === 'return' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="return-date">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Return date
                      </label>
                      <Input
                        id="return-date"
                        type="date"
                        className={`w-full h-12 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                          formErrors.returnDate ? 'border-red-500 focus:ring-red-200' : ''
                        }`}
                        min={departureDate || getTomorrowDate()}
                        value={returnDate}
                        onChange={(e) => {
                          setReturnDate(e.target.value);
                          if (formErrors.returnDate) {
                            setFormErrors({ ...formErrors, returnDate: '' });
                          }
                        }}
                        aria-label="Return date"
                      />
                      {formErrors.returnDate && (
                        <p className="text-xs text-red-600 mt-1">{formErrors.returnDate}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Passengers */}
                <div className={tripType === 'return' ? 'md:col-span-4' : 'md:col-span-6'}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center" htmlFor="adults">
                      <Users className="w-4 h-4 mr-2 text-blue-600" /> Passengers
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <select
                          id="adults"
                          className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-900 appearance-none pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                          aria-label="Number of adults"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} Adult{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="relative">
                        <select
                          id="children"
                          className="w-full h-12 px-4 rounded-md bg-white border border-gray-200 text-gray-900 appearance-none pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          value={children}
                          onChange={(e) => setChildren(e.target.value)}
                          aria-label="Number of children"
                          aria-labelledby="children-label"
                        >
                          {[0, 1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>
                              {num} Child{num !== 1 ? 'ren' : ''}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                        <label id="children-label" className="sr-only">Number of children</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 h-14 text-base md:text-lg font-semibold rounded-xl shadow-lg transition-colors mt-4"
                aria-label="Search flights"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Flights
              </Button>
              
              {/* Helper text */}
              <p className="text-xs text-center text-gray-600 mt-3">
                Searching over 500+ airlines to find you the best deals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}