'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Plane, Clock, ArrowRight, Calendar, User, ArrowRightLeft, ChevronDown, ChevronUp, Star, Info, Luggage, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlightOffer } from '@/lib/amadeus';
import { useRouter } from 'next/navigation';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [searchDetails, setSearchDetails] = useState({
    type: 'flight',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: '1',
    children: '0'
  });
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('price');
  const router = useRouter();

  useEffect(() => {
    // Parse search parameters
    const type = searchParams.get('type') || 'flight';
    const origin = searchParams.get('departureAirport') || 'LHR';
    const destination = searchParams.get('destination') || '';
    const departureDate = searchParams.get('departureDate') || '';
    const returnDate = searchParams.get('returnDate') || '';
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';

    setSearchDetails({
      type,
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      children
    });

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        // Call our API with the search parameters
        const response = await fetch(`/api/flight-search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&children=${children}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch flight results');
        }
        
        const data = await response.json();
        setFlights(data);
      } catch (err) {
        console.error('Error fetching flight search results:', err);
        setError(err instanceof Error ? err.message : 'Failed to load flights');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  // Add airline mapping function to display full airline names
  const getAirlineName = (code: string): string => {
    const airlineMap: Record<string, string> = {
      'BA': 'British Airways',
      'AA': 'American Airlines',
      'LH': 'Lufthansa',
      'AF': 'Air France',
      'KL': 'KLM Royal Dutch Airlines',
      'DL': 'Delta Air Lines',
      'UA': 'United Airlines',
      'EK': 'Emirates',
      'QR': 'Qatar Airways',
      'SQ': 'Singapore Airlines',
      'CX': 'Cathay Pacific',
      'EY': 'Etihad Airways',
      'TK': 'Turkish Airlines',
      'VS': 'Virgin Atlantic',
      'IB': 'Iberia',
      'FR': 'Ryanair',
      'U2': 'easyJet',
      'LX': 'SWISS',
      'OS': 'Austrian Airlines',
      'AY': 'Finnair',
    };
    return airlineMap[code] || code;
  };

  // Expand the airport data to include more information
  const airportData = [
    { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'United Kingdom' },
    { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport', country: 'USA' },
    { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International Airport', country: 'USA' },
    { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle Airport', country: 'France' },
    { code: 'SYD', city: 'Sydney', name: 'Sydney International Airport', country: 'Australia' },
    { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'UAE' },
    { code: 'FCO', city: 'Rome', name: 'Leonardo da Vinci–Fiumicino Airport', country: 'Italy' },
    { code: 'MAD', city: 'Madrid', name: 'Madrid-Barajas Airport', country: 'Spain' },
    { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand' },
    { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore' },
    { code: 'HND', city: 'Tokyo', name: 'Haneda Airport', country: 'Japan' },
    { code: 'MUC', city: 'Munich', name: 'Munich Airport', country: 'Germany' },
    { code: 'AMS', city: 'Amsterdam', name: 'Amsterdam Airport Schiphol', country: 'Netherlands' },
    { code: 'BCN', city: 'Barcelona', name: 'Barcelona-El Prat Airport', country: 'Spain' },
    { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Turkey' },
    { code: 'MIA', city: 'Miami', name: 'Miami International Airport', country: 'USA' },
    { code: 'YYZ', city: 'Toronto', name: 'Toronto Pearson International Airport', country: 'Canada' },
    { code: 'MEX', city: 'Mexico City', name: 'Mexico City International Airport', country: 'Mexico' },
    { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International Airport', country: 'India' },
    { code: 'GRU', city: 'São Paulo', name: 'São Paulo/Guarulhos International Airport', country: 'Brazil' },
    { code: 'ORY', city: 'Paris', name: 'Orly Airport', country: 'France' },
    { code: 'LGA', city: 'New York', name: 'LaGuardia Airport', country: 'USA' },
    { code: 'LGW', city: 'London', name: 'Gatwick Airport', country: 'United Kingdom' },
    { code: 'STN', city: 'London', name: 'Stansted Airport', country: 'United Kingdom' },
  ];

  // Update the getCityName function to include country information
  const getCityName = (iataCode: string): string => {
    const airport = airportData.find(a => a.code === iataCode);
    return airport ? `${airport.city}, ${airport.country}` : iataCode;
  };

  const getAirportName = (iataCode: string): string => {
    const airport = airportData.find(a => a.code === iataCode);
    return airport 
      ? `${airport.name} (${iataCode}), ${airport.city}, ${airport.country}` 
      : iataCode;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format day of week
  const formatDayOfWeek = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'short' });
  };

  // Format time with AM/PM
  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Format duration from PT format
  const formatDuration = (duration: string) => {
    if (!duration) return '';
    return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
  };

  // Toggle flight details expansion
  const toggleFlightDetails = (flightId: string) => {
    if (expandedFlight === flightId) {
      setExpandedFlight(null);
    } else {
      setExpandedFlight(flightId);
    }
  };

  // Sort flights
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortOption === 'price') {
      return parseFloat(a.price.total) - parseFloat(b.price.total);
    } else if (sortOption === 'duration') {
      const aDuration = a.itineraries[0]?.segments[0]?.duration || '';
      const bDuration = b.itineraries[0]?.segments[0]?.duration || '';
      return aDuration.localeCompare(bDuration);
    } else {
      // Default: sort by departure time
      const aTime = a.itineraries[0]?.segments[0]?.departure.at || '';
      const bTime = b.itineraries[0]?.segments[0]?.departure.at || '';
      return aTime.localeCompare(bTime);
    }
  });

  if (loading) {
  return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Searching for flights...</h1>
            <p className="text-gray-600">We're finding the best options for your trip.</p>
            <div className="mt-8 flex justify-center">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Plane className="h-8 w-8 text-blue-600" />
            </div>
                <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 p-6 rounded-xl shadow-md mb-8 border-l-4 border-red-500">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We couldn't find flights for your search. Please try again with different parameters.</p>
            <p className="text-red-600 text-sm">{error}</p>
            <Button className="mt-4" onClick={() => window.history.back()}>
              Back to search
            </Button>
          </div>
        </div>
            </div>
    );
  }

  const originCity = getCityName(searchDetails.origin);
  const destinationCity = searchDetails.destination ? getCityName(searchDetails.destination) : 'Destination';

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Search summary */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-md mb-8">
          <h1 className="text-2xl font-bold mb-4">Flight search results</h1>
          <div className="flex flex-wrap items-center gap-5 text-white/90">
            <div className="flex items-center bg-white/20 px-3 py-2 rounded-lg">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              <span className="font-medium">{getCityName(searchDetails.origin)} to {destinationCity}</span>
            </div>
            <div className="flex items-center bg-white/20 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(searchDetails.departureDate)}</span>
              {searchDetails.returnDate && (
                <span> - {formatDate(searchDetails.returnDate)}</span>
              )}
            </div>
            <div className="flex items-center bg-white/20 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 mr-2" />
              <span>{searchDetails.adults} Adult{parseInt(searchDetails.adults) !== 1 ? 's' : ''}</span>
              {parseInt(searchDetails.children) > 0 && (
                <span>, {searchDetails.children} Child{parseInt(searchDetails.children) !== 1 ? 'ren' : ''}</span>
              )}
            </div>
          </div>
        </div>
        
        {flights.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 p-4 rounded-full">
                <Plane className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">No flights found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any flights matching your search criteria. Please try different dates or destinations.
            </p>
            <Button onClick={() => window.history.back()}>
              Back to search
            </Button>
                  </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{flights.length} flights found</h2>
                  <p className="text-sm text-gray-500">Showing all available options</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <div className="flex rounded-lg overflow-hidden border border-gray-200">
                    <button 
                      onClick={() => setSortOption('price')}
                      className={`px-3 py-1 text-sm ${sortOption === 'price' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                    >
                      Price
                    </button>
                    <button 
                      onClick={() => setSortOption('duration')}
                      className={`px-3 py-1 text-sm ${sortOption === 'duration' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                    >
                      Duration
                    </button>
                    <button 
                      onClick={() => setSortOption('departure')}
                      className={`px-3 py-1 text-sm ${sortOption === 'departure' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                    >
                      Departure
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {sortedFlights.map((flight) => {
                const outboundSegment = flight.itineraries[0]?.segments[0];
                const returnSegment = flight.itineraries[1]?.segments[0];
                const isExpanded = expandedFlight === flight.id;
                
                if (!outboundSegment) return null;
                
                // Departure and arrival dates/times
                const departureDate = new Date(outboundSegment.departure.at);
                const arrivalDate = new Date(outboundSegment.arrival.at);
                
                return (
                  <Card key={flight.id} className={`overflow-hidden border-transparent hover:border-blue-100 transition-all duration-200 ${isExpanded ? 'shadow-md' : 'shadow-sm'}`}>
                    {/* Main flight information */}
                    <div className="bg-white rounded-t-xl">
                      <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                        {/* Airline info */}
                        <div className="p-5 md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-2 border-b md:border-b-0 md:border-r border-gray-100">
                          <div className="bg-gray-100 rounded-md p-2 flex items-center justify-center">
                            <Plane className="w-5 h-5 text-blue-600" />
                          </div>
                  <div>
                            <div className="font-medium text-gray-900">{getAirlineName(outboundSegment.carrierCode)}</div>
                            <div className="text-xs text-gray-500">Flight {outboundSegment.number}</div>
                          </div>
                        </div>
                        
                        {/* Flight route */}
                        <div className="p-5 md:col-span-7 border-b md:border-b-0 md:border-r border-gray-100">
                          <div className="grid grid-cols-7 items-center gap-2">
                            {/* Departure */}
                            <div className="col-span-3">
                              <div className="text-lg font-bold text-gray-900">{formatTime(outboundSegment.departure.at)}</div>
                              <div className="font-medium text-gray-800">
                                {outboundSegment.departure.iataCode}
                                <span className="text-xs text-gray-500 ml-1">
                                  {getCityName(outboundSegment.departure.iataCode)}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(departureDate.toISOString())} • {formatDayOfWeek(departureDate.toISOString())}
                              </div>
                              <div className="text-xs text-gray-500">Terminal {outboundSegment.departure.terminal || '-'}</div>
                            </div>
                            
                            {/* Duration */}
                            <div className="col-span-1 flex flex-col items-center">
                              <div className="text-xs font-medium text-gray-500 mb-1">
                                {formatDuration(outboundSegment.duration)}
                              </div>
                              <div className="w-full h-px bg-gray-300 relative">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Direct</div>
                            </div>
                            
                            {/* Arrival */}
                            <div className="col-span-3 text-right">
                              <div className="text-lg font-bold text-gray-900">{formatTime(outboundSegment.arrival.at)}</div>
                              <div className="font-medium text-gray-800">
                                {outboundSegment.arrival.iataCode}
                                <span className="text-xs text-gray-500 ml-1">
                                  {getCityName(outboundSegment.arrival.iataCode)}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDate(arrivalDate.toISOString())} • {formatDayOfWeek(arrivalDate.toISOString())}
                              </div>
                              <div className="text-xs text-gray-500">Terminal {outboundSegment.arrival.terminal || '-'}</div>
                            </div>
                          </div>
                          
                          {/* Return flight summary (if exists) */}
                          {returnSegment && (
                            <>
                              <div className="my-3 border-t border-dashed border-gray-200"></div>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <div className="bg-blue-50 text-blue-700 rounded-full px-2 py-0.5 text-xs font-medium mr-2">Return</div>
                                  <span>{formatDate(returnSegment.departure.at)}</span>
                                </div>
                                <div className="text-gray-600">
                                  {returnSegment.departure.iataCode} ({getCityName(returnSegment.departure.iataCode)}) 
                                  → 
                                  {returnSegment.arrival.iataCode} ({getCityName(returnSegment.arrival.iataCode)})
                                </div>
                                <div className="text-gray-600">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {formatDuration(returnSegment.duration)}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* Price and booking */}
                        <div className="p-5 md:col-span-3 flex flex-col">
                          <div className="text-2xl font-bold text-blue-700 mb-1">
                            £{parseFloat(flight.price.total).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 mb-4">
                            {returnSegment ? 'Return' : 'One way'} • All taxes included
                  </div>
                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                              onClick={() => {
                                const queryParams = new URLSearchParams({
                                  flightId: flight.id,
                                  origin: outboundSegment.departure.iataCode,
                                  originCity: getCityName(outboundSegment.departure.iataCode),
                                  destination: outboundSegment.arrival.iataCode,
                                  destinationCity: getCityName(outboundSegment.arrival.iataCode),
                                  departureDate: outboundSegment.departure.at,
                                  returnDate: returnSegment?.departure.at || '',
                                  price: flight.price.total,
                                  airline: outboundSegment.carrierCode,
                                  flightNumber: outboundSegment.number
                                });
                                
                                router.push(`/enquire?${queryParams.toString()}`);
                              }}
                            >
                              Enquire
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <button 
                              onClick={() => toggleFlightDetails(flight.id)}
                              className="w-full flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 py-1"
                            >
                              {isExpanded ? (
                                <>Hide details <ChevronUp className="w-4 h-4 ml-1" /></>
                              ) : (
                                <>View details <ChevronDown className="w-4 h-4 ml-1" /></>
                              )}
                  </button>
                </div>
              </div>
                      </div>
                    </div>
                    
                    {/* Expanded details section */}
                    {isExpanded && (
                      <div className="p-5 bg-gray-50 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Outbound details */}
                          <div>
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                              <Plane className="w-4 h-4 mr-2 text-blue-600" />
                              Outbound flight
                            </h3>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex items-center mb-3">
                                <div className="bg-blue-50 rounded p-1.5">
                                  <Plane className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="ml-2">
                                  <div className="font-medium">{getAirlineName(outboundSegment.carrierCode)}</div>
                                  <div className="text-xs text-gray-500">Flight {outboundSegment.number}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-start mb-4">
                                <div className="mr-4 flex flex-col items-center">
                                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                  <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                </div>
                                
                                <div className="flex-1">
                                  <div className="mb-4">
                                    <div className="flex justify-between">
                                      <div className="font-medium text-gray-900">{formatTime(outboundSegment.departure.at)}</div>
                                      <div className="text-sm text-gray-500">{formatDate(outboundSegment.departure.at)}</div>
                                    </div>
                                    <div className="text-sm">
                                      {outboundSegment.departure.iataCode} - {getCityName(outboundSegment.departure.iataCode)}
                                      <span className="text-xs text-gray-500 ml-1">{getAirportName(outboundSegment.departure.iataCode)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Terminal {outboundSegment.departure.terminal || '-'}</div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between">
                                      <div className="font-medium text-gray-900">{formatTime(outboundSegment.arrival.at)}</div>
                                      <div className="text-sm text-gray-500">{formatDate(outboundSegment.arrival.at)}</div>
                                    </div>
                                    <div className="text-sm">
                                      {outboundSegment.arrival.iataCode} - {getCityName(outboundSegment.arrival.iataCode)}
                                      <span className="text-xs text-gray-500 ml-1">{getAirportName(outboundSegment.arrival.iataCode)}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">Terminal {outboundSegment.arrival.terminal || '-'}</div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Amenities */}
                              <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-600">
                                <div className="flex items-center">
                                  <Luggage className="w-3 h-3 mr-1" />
                                  <span>Hand baggage</span>
                                </div>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 mr-1" />
                                  <span>Economy</span>
                                </div>
                                <div className="flex items-center">
                                  <Coffee className="w-3 h-3 mr-1" />
                                  <span>Refreshments</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Return details (if applicable) */}
                          {returnSegment && (
                            <div>
                              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                                <Plane className="w-4 h-4 mr-2 text-blue-600 transform rotate-180" />
                                Return flight
                              </h3>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center mb-3">
                                  <div className="bg-blue-50 rounded p-1.5">
                                    <Plane className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div className="ml-2">
                                    <div className="font-medium">{getAirlineName(returnSegment.carrierCode)}</div>
                                    <div className="text-xs text-gray-500">Flight {returnSegment.number}</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-start mb-4">
                                  <div className="mr-4 flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="mb-4">
                                      <div className="flex justify-between">
                                        <div className="font-medium text-gray-900">{formatTime(returnSegment.departure.at)}</div>
                                        <div className="text-sm text-gray-500">{formatDate(returnSegment.departure.at)}</div>
                                      </div>
                                      <div className="text-sm">{getAirportName(returnSegment.departure.iataCode)}</div>
                                      <div className="text-xs text-gray-500">Terminal {returnSegment.departure.terminal || '-'}</div>
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between">
                                        <div className="font-medium text-gray-900">{formatTime(returnSegment.arrival.at)}</div>
                                        <div className="text-sm text-gray-500">{formatDate(returnSegment.arrival.at)}</div>
                                      </div>
                                      <div className="text-sm">{getAirportName(returnSegment.arrival.iataCode)}</div>
                                      <div className="text-xs text-gray-500">Terminal {returnSegment.arrival.terminal || '-'}</div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Amenities */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-600">
                                  <div className="flex items-center">
                                    <Luggage className="w-3 h-3 mr-1" />
                                    <span>Hand baggage</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="w-3 h-3 mr-1" />
                                    <span>Economy</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Coffee className="w-3 h-3 mr-1" />
                                    <span>Refreshments</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Price breakdown */}
                        <div className="mt-6">
                          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                            <Info className="w-4 h-4 mr-2 text-blue-600" />
                            Fare details
                          </h3>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Base fare</span>
                                <span className="font-medium">£{(parseFloat(flight.price.total) * 0.85).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Taxes & fees</span>
                                <span className="font-medium">£{(parseFloat(flight.price.total) * 0.15).toFixed(2)}</span>
                              </div>
                              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span className="text-blue-700">£{parseFloat(flight.price.total).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
        </div>
          </>
        )}
      </div>
    </div>
  );
} 