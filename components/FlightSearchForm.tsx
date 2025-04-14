'use client';

import { Search, Plane, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [departureAirport, setDepartureAirport] = useState('LHR');
  const [departureAirportDisplay, setDepartureAirportDisplay] = useState('London, United Kingdom - Heathrow Airport (LHR)');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showDepartureAirportSuggestions, setShowDepartureAirportSuggestions] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Common airports with more details
  const airports: Airport[] = [
    { id: 'lhr', iataCode: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
    { id: 'lgw', iataCode: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom' },
    { id: 'stn', iataCode: 'STN', name: 'Stansted Airport', city: 'London', country: 'United Kingdom' },
    { id: 'cdg', iataCode: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
    { id: 'ory', iataCode: 'ORY', name: 'Orly Airport', city: 'Paris', country: 'France' },
    { id: 'jfk', iataCode: 'JFK', name: 'John F. Kennedy Airport', city: 'New York', country: 'USA' },
    { id: 'lga', iataCode: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'USA' },
    { id: 'ams', iataCode: 'AMS', name: 'Schiphol Airport', city: 'Amsterdam', country: 'Netherlands' },
    { id: 'fco', iataCode: 'FCO', name: 'Fiumicino Airport', city: 'Rome', country: 'Italy' },
    { id: 'mad', iataCode: 'MAD', name: 'Barajas Airport', city: 'Madrid', country: 'Spain' },
    { id: 'dxb', iataCode: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
    { id: 'syd', iataCode: 'SYD', name: 'Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
    { id: 'hnd', iataCode: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
    { id: 'sin', iataCode: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  ];

  // Filter destinations based on search input
  const filteredDestinations = destination.trim() !== '' 
    ? airports
        .filter(airport => 
          airport.name.toLowerCase().includes(destination.toLowerCase()) ||
          airport.city.toLowerCase().includes(destination.toLowerCase()) ||
          airport.country.toLowerCase().includes(destination.toLowerCase()) ||
          airport.iataCode.toLowerCase().includes(destination.toLowerCase())
        )
        .map(airport => ({
          id: airport.id,
          name: `${airport.city}, ${airport.country} - ${airport.name} (${airport.iataCode})`,
          iataCode: airport.iataCode,
        }))
    : [];

  // Filter departure airports based on search input
  const filteredDepartureAirports = departureAirportDisplay.trim() !== '' 
    ? airports.filter(airport => 
        airport.name.toLowerCase().includes(departureAirportDisplay.toLowerCase()) ||
        airport.city.toLowerCase().includes(departureAirportDisplay.toLowerCase()) ||
        airport.country.toLowerCase().includes(departureAirportDisplay.toLowerCase()) ||
        airport.iataCode.toLowerCase().includes(departureAirportDisplay.toLowerCase())
      )
    : airports;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!destination) {
      errors.destination = 'Please enter a destination';
    }
    
    if (!departureAirport) {
      errors.departureAirport = 'Please enter a departure airport';
    }
    
    if (!departureDate) {
      errors.departureDate = 'Please select a departure date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = () => {
    if (!validateForm()) {
      return;
    }
    
    // Check if the destination matches an airport
    const airportMatch = airports.find(
      airport => 
        airport.name.toLowerCase().includes(destination.toLowerCase()) ||
        airport.city.toLowerCase().includes(destination.toLowerCase()) ||
        airport.iataCode.toLowerCase() === destination.toLowerCase()
    );

    // Build search parameters for the flight search
    const searchParams = new URLSearchParams({
      type: 'flight',
      departureAirport,
      // If we matched an airport, use its code, otherwise just use the destination as entered
      destination: airportMatch ? airportMatch.iataCode : destination,
      departureDate,
      ...(returnDate && { returnDate }),
      adults,
      children
    });
    
    router.push(`/search?${searchParams.toString()}`);
  };

  // Handle clicking on a destination suggestion
  const handleDestinationClick = (item: any) => {
    setDestination(item.name);
    setShowDestinationSuggestions(false);
    
    if (formErrors.destination) {
      setFormErrors({ ...formErrors, destination: '' });
    }
  };

  // Handle clicking on a departure airport suggestion
  const handleDepartureAirportClick = (airport: Airport) => {
    setDepartureAirport(airport.iataCode);
    setDepartureAirportDisplay(`${airport.city}, ${airport.country} - ${airport.name} (${airport.iataCode})`);
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
              {showDepartureAirportSuggestions && filteredDepartureAirports.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                  <ul className="max-h-60 overflow-auto">
                    {filteredDepartureAirports.slice(0, 6).map((airport) => (
                      <li key={airport.id}>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-150 flex items-center"
                          onClick={() => handleDepartureAirportClick(airport)}
                        >
                          <Plane className="w-3 h-3 mr-2 text-blue-500" />
                          <div>
                            <div className="font-medium">{airport.city} - {airport.name}</div>
                            <div className="text-xs text-gray-500">{airport.iataCode} • {airport.country}</div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* To - Destination */}
            <div className="space-y-1 relative">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Plane className="w-4 h-4 mr-2" /> To
              </label>
              <Input
                type="text"
                placeholder="Where to? (e.g. Paris, New York, CDG)"
                className={`w-full bg-white border-gray-200 text-gray-900 h-10 ${
                  formErrors.destination ? 'border-red-500' : ''
                }`}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
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
              />
              {formErrors.destination && (
                <p className="text-xs text-red-500 mt-1">{formErrors.destination}</p>
              )}
              
              {/* Destination Suggestions */}
              {showDestinationSuggestions && filteredDestinations.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
                  <ul className="max-h-60 overflow-auto">
                    {filteredDestinations.map((dest) => (
                      <li key={dest.id}>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-150 flex items-center"
                          onClick={() => handleDestinationClick(dest)}
                        >
                          <Plane className="w-3 h-3 mr-2 text-blue-500" />
                          <span>{dest.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" /> Depart
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
                }}
              />
              {formErrors.departureDate && (
                <p className="text-xs text-red-500 mt-1">{formErrors.departureDate}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 mr-2" /> Return
              </label>
              <Input
                type="date"
                className="w-full bg-white border-gray-200 text-gray-900 h-10"
                value={returnDate}
                min={departureDate || getTomorrowDate()}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2" /> Adults
              </label>
              <select
                className="w-full h-10 px-3 rounded-md bg-white border border-gray-200 text-gray-900"
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
                className="w-full h-10 px-3 rounded-md bg-white border border-gray-200 text-gray-900"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 text-base font-semibold rounded-lg shadow-md transition-colors mt-2 flex items-center justify-center"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Flights
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 