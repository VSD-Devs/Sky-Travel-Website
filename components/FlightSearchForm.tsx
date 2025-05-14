'use client';

import { Search, Plane, Users, Calendar, ArrowRight, Info, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { airports } from '@/data/airports';
import EnhancedDestinationSearch, { Destination } from './EnhancedDestinationSearch';
import { cn } from '@/lib/utils';

// Airport interface to ensure type safety
interface Airport {
  id: string;
  iataCode: string;
  name: string;
  city: string;
  country: string;
}

interface FlightSearchFormProps {
  variant?: 'default' | 'featured';
  className?: string;
}

export default function FlightSearchForm({ variant = 'default', className = '' }: FlightSearchFormProps) {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [destinationIataCode, setDestinationIataCode] = useState('');
  const [departureAirport, setDepartureAirport] = useState('LHR');
  const [departureAirportDisplay, setDepartureAirportDisplay] = useState('London, United Kingdom - Heathrow Airport (LHR)');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [showDepartureAirportSuggestions, setShowDepartureAirportSuggestions] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [validDestination, setValidDestination] = useState(false);

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
    
    if (!destinationIataCode) {
      errors.destination = 'Please select a valid destination';
    }
    
    if (!departureAirport) {
      errors.departureAirport = 'Please select a departure airport';
    }
    
    if (!departureDate) {
      errors.departureDate = 'Please select a departure date';
    }
    
    // Check if return date is before departure date
    if (returnDate && new Date(returnDate) < new Date(departureDate)) {
      errors.returnDate = 'Return date must be after departure date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = () => {
    if (!validateForm()) {
      return;
    }

    console.log(`Searching for flights: ${departureAirport} → ${destinationIataCode}`);

    // Use dates directly without additional formatting
    const searchParams = new URLSearchParams({
      type: 'flight',
      departureAirport,
      destination: destinationIataCode,
      departureDate,
      ...(returnDate && { returnDate }),
      adults,
      children
    });
    
    router.push(`/search?${searchParams.toString()}`);
  };

  // Handle destination selection
  const handleDestinationSelect = (selectedDestination: Destination) => {
    if (selectedDestination.iataCode) {
      setDestination(selectedDestination.displayName);
      setDestinationIataCode(selectedDestination.iataCode);
      setValidDestination(true);
      
      // Store additional information for all airports option
      if (selectedDestination.isAllAirports) {
        if (selectedDestination.subType === 'COUNTRY') {
          console.log(`Selected all airports in ${selectedDestination.countryName}`);
          // The API will handle the country-level "all airports" code format (XXXC)
        } else {
          console.log(`Selected all airports in ${selectedDestination.cityName}`);
          // The API will handle the city "all airports" code format (XXXA)
        }
      }
      
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

  // Different styles based on variant
  const containerStyles = variant === 'featured' 
    ? 'bg-white/95 rounded-2xl shadow-lg border border-white/20 overflow-hidden'
    : 'bg-white rounded-lg shadow-md overflow-hidden';

  return (
    <div className={`w-full ${className}`}>
      <div className={containerStyles}>
        {/* Form Header */}
        <div className={`bg-gradient-to-r from-blue-600 to-blue-700 p-3 md:p-4 ${variant === 'featured' ? 'text-center' : ''}`}>
          <h2 className="text-lg md:text-xl font-bold text-white mb-1 flex items-center justify-center">
            <Plane className="mr-2 h-5 w-5" />
            Find Your Perfect Flight
          </h2>
          {variant === 'featured' && (
            <p className="text-sm md:text-base text-blue-100">
              Search, compare and book flights to worldwide destinations
            </p>
          )}
        </div>

        {/* Form Content */}
        <div className="p-3 md:p-6 space-y-3">
          {/* Destination and Departure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* From - Departure Airport */}
            <div className="space-y-1 relative">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Plane className="w-4 h-4 mr-2 rotate-45" /> From
              </label>
              <Input
                type="text"
                placeholder="Where from? (e.g. London, LHR)"
                className={`w-full bg-white border-gray-200 text-gray-900 h-10 ${
                  formErrors.departureAirport ? 'border-red-500' : ''
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
              />
              {formErrors.departureAirport && (
                <p className="text-xs text-red-500 mt-1">{formErrors.departureAirport}</p>
              )}
              
              {/* Airport Suggestions Dropdown */}
              {showDepartureAirportSuggestions && sortedDepartureOptions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                  <ul className="max-h-60 overflow-auto">
                    {sortedDepartureOptions.slice(0, 8).map((airport) => (
                      <li key={airport.id}>
                        <button
                          className={cn(
                            "w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-150 flex items-center",
                            airport.isCountry ? "bg-green-50/50" : (airport.isAllAirports ? "bg-blue-50/50" : "")
                          )}
                          onClick={() => handleDepartureAirportClick(airport)}
                        >
                          {airport.isCountry ? (
                            <Globe className="w-4 h-4 mr-2 text-green-600" />
                          ) : airport.isAllAirports ? (
                            <Globe className="w-4 h-4 mr-2 text-blue-600" />
                          ) : (
                            <Plane className="w-4 h-4 mr-2 text-blue-600" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {airport.isCountry ? (
                                <>{airport.country}<span className="ml-1 text-green-600">(All airports)</span></>
                              ) : airport.isAllAirports ? (
                                <>{airport.city}, {airport.country}<span className="ml-1 text-blue-600">(All airports)</span></>
                              ) : (
                                <>{airport.city}, {airport.country}</>
                              )}
                            </div>
                            {!airport.isCountry && !airport.isAllAirports && (
                              <div className="text-xs text-gray-500">{airport.name} ({airport.iataCode})</div>
                            )}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* To - Destination (Enhanced) */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Plane className="w-4 h-4 mr-2" /> To
              </label>
              <EnhancedDestinationSearch
                placeholder="Where to? (e.g. Paris, New York, Rome)"
                onSelect={handleDestinationSelect}
                value={destination}
                error={formErrors.destination}
                allowCities={true}
                allowAirports={true}
                inputClassName={`w-full bg-white border-gray-200 text-gray-900 h-10 ${
                  formErrors.destination ? 'border-red-500' : ''
                }`}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Departure Date */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" /> Departure Date
              </label>
              <Input
                type="date"
                className={`w-full bg-white border-gray-200 text-gray-900 h-10 ${
                  formErrors.departureDate ? 'border-red-500' : ''
                }`}
                value={departureDate}
                min={getTomorrowDate()}
                onChange={(e) => {
                  setDepartureDate(e.target.value);
                  if (formErrors.departureDate) {
                    setFormErrors({ ...formErrors, departureDate: '' });
                  }
                  // If return date is before new departure date, adjust it
                  if (returnDate && new Date(returnDate) < new Date(e.target.value)) {
                    // Set return date to departure date + 7 days
                    const newReturnDate = new Date(e.target.value);
                    newReturnDate.setDate(newReturnDate.getDate() + 7);
                    setReturnDate(newReturnDate.toISOString().split('T')[0]);
                  }
                }}
              />
              {formErrors.departureDate && (
                <p className="text-xs text-red-500 mt-1">{formErrors.departureDate}</p>
              )}
            </div>

            {/* Return Date */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" /> Return Date
              </label>
              <Input
                type="date"
                className={`w-full bg-white border-gray-200 text-gray-900 h-10 ${
                  formErrors.returnDate ? 'border-red-500' : ''
                }`}
                value={returnDate}
                min={departureDate || getTomorrowDate()}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  if (formErrors.returnDate) {
                    setFormErrors({ ...formErrors, returnDate: '' });
                  }
                }}
              />
              {formErrors.returnDate && (
                <p className="text-xs text-red-500 mt-1">{formErrors.returnDate}</p>
              )}
            </div>
          </div>

          {/* Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Adults */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2" /> Adults (12y+)
              </label>
              <select
                className="w-full h-10 rounded-md border border-gray-200 bg-white px-3 text-gray-900"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2" /> Children (0-11y)
              </label>
              <select
                className="w-full h-10 rounded-md border border-gray-200 bg-white px-3 text-gray-900"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5" />
            Search Flights
          </Button>

          {/* Informational text */}
          <div className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center">
            <Info className="w-3 h-3 mr-1" />
            Searching all available airlines for the best prices
          </div>
        </div>
      </div>
    </div>
  );
} 