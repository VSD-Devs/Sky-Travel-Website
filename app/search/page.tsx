'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowRightLeft, Calendar, ChevronDown, ChevronUp, Clock, Coffee, CreditCard, Info, Luggage, Plane, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlightOffer } from '@/lib/amadeus';
import { useRouter } from 'next/navigation';
import { airports, getAirportByCode, getFormattedLocation } from '@/data/airports';

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
        setError(null);
        
        // Call our API with the search parameters
        const response = await fetch(`/api/flight-search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&children=${children}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch flight results');
        }
        
        const data = await response.json();
        
        if (!data || data.length === 0) {
          setFlights([]);
          setError('No flights found for this route and date combination. Please try different dates or destinations.');
        } else {
          setFlights(data);
          
          // Store the search session
          try {
            const searchParamsObj = {
              type,
              origin,
              destination,
              departureDate,
              returnDate,
              adults,
              children
            };
            
            const sessionResponse = await fetch('/api/search-sessions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                searchParams: searchParamsObj,
                results: data
              }),
            });
            
            if (sessionResponse.ok) {
              const sessionData = await sessionResponse.json();
              console.log('Search session stored with ID:', sessionData.sessionId);
            }
          } catch (sessionError) {
            console.error('Error storing search session:', sessionError);
            // Continue anyway - this is not critical
          }
        }
      } catch (err) {
        console.error('Error fetching flight search results:', err);
        setFlights([]);
        setError(err instanceof Error ? err.message : 'Failed to load flights. Please try again later or choose a different route.');
      } finally {
        setLoading(false);
      }
    };

    if (destination && departureDate) {
      fetchSearchResults();
    } else {
      setError('Please specify both destination and departure date.');
      setLoading(false);
    }
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

  // Get city and country from IATA code
  const getCityName = (iataCode: string): string => {
    return getFormattedLocation(iataCode);
  };

  // Get full airport name
  const getAirportName = (iataCode: string): string => {
    const airport = getAirportByCode(iataCode);
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
  const sortFlights = (flights: FlightOffer[], option: string) => {
    return [...flights].sort((a, b) => {
      if (option === 'price') {
        return parseFloat(a.price.total) - parseFloat(b.price.total);
      } else if (option === 'duration') {
        const durationA = a.itineraries[0].duration.replace('PT', '').replace('H', '').replace('M', '');
        const durationB = b.itineraries[0].duration.replace('PT', '').replace('H', '').replace('M', '');
        return parseInt(durationA) - parseInt(durationB);
      } else if (option === 'departureTime') {
        return new Date(a.itineraries[0].segments[0].departure.at).getTime() - 
               new Date(b.itineraries[0].segments[0].departure.at).getTime();
      } else if (option === 'arrivalTime') {
        const aSegments = a.itineraries[0].segments;
        const bSegments = b.itineraries[0].segments;
        return new Date(aSegments[aSegments.length - 1].arrival.at).getTime() - 
               new Date(bSegments[bSegments.length - 1].arrival.at).getTime();
      }
      return 0;
    });
  };

  const sortedFlights = sortFlights(flights, sortOption);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <Plane className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">Searching for the best flight deals...</h2>
          <p className="text-muted-foreground mt-2">Please wait while we find flights from {getCityName(searchDetails.origin)} to {getCityName(searchDetails.destination)}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Info className="w-16 h-16 text-destructive mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">Oops! Something went wrong</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button 
            className="mt-6" 
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (flights.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Info className="w-16 h-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-semibold mt-4">No flights found</h2>
          <p className="text-muted-foreground mt-2">We couldn't find any flights matching your search criteria. Please try different dates or destinations.</p>
          <Button 
            className="mt-6" 
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Flights: {getCityName(searchDetails.origin)} to {getCityName(searchDetails.destination)}
          </h1>
          <div className="text-muted-foreground">
            <p>{formatDate(searchDetails.departureDate)} {searchDetails.returnDate ? `- ${formatDate(searchDetails.returnDate)}` : '(One-way)'}</p>
            <p>{searchDetails.adults} Adult{parseInt(searchDetails.adults) !== 1 ? 's' : ''} 
              {parseInt(searchDetails.children) > 0 ? `, ${searchDetails.children} Child${parseInt(searchDetails.children) !== 1 ? 'ren' : ''}` : ''}
            </p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Sort by:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price">Price (Lowest first)</option>
              <option value="duration">Duration (Shortest first)</option>
              <option value="departureTime">Departure time (Earliest first)</option>
              <option value="arrivalTime">Arrival time (Earliest first)</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg">Searching for the best flights...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-6 my-8">
          <h2 className="text-xl font-bold text-amber-800 mb-2">No Flights Found</h2>
          <p className="text-amber-700 mb-4">{error}</p>
          
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Suggestions:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Try different dates - flights may be available on other days</li>
              <li>Check if the airport codes are correct</li>
              <li>Consider nearby airports as alternatives</li>
              <li>For international flights, try searching one-way instead of round trip</li>
            </ul>
          </div>
          
          <Button 
            onClick={() => router.push('/')}
            className="mt-4 flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Search
          </Button>
        </div>
      )}
      
      {!loading && !error && sortedFlights.length > 0 && (
        <div className="space-y-6">
          {sortedFlights.map((flight) => {
            const outbound = flight.itineraries[0];
            const firstSegment = outbound.segments[0];
            const lastSegment = outbound.segments[outbound.segments.length - 1];
            const isMultiSegment = outbound.segments.length > 1;
            const isExpanded = expandedFlight === flight.id;
            
            return (
              <Card key={flight.id} className={`overflow-hidden transition-shadow ${isExpanded ? 'shadow-lg' : 'shadow'}`}>
                <CardContent className="p-0">
                  <div className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Airline logo and name */}
                      <div className="md:col-span-2 flex flex-col items-center md:items-start">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                          <span className="font-semibold text-primary">{firstSegment.carrierCode}</span>
                        </div>
                        <span className="text-sm mt-1">{getAirlineName(firstSegment.carrierCode)}</span>
                        {isMultiSegment && (
                          <span className="text-xs text-muted-foreground mt-1">
                            {outbound.segments.length} stops
                          </span>
                        )}
                      </div>

                      {/* Flight times */}
                      <div className="md:col-span-7 grid grid-cols-3 gap-2 items-center">
                        <div className="text-center md:text-left">
                          <div className="text-xl font-semibold">{formatTime(firstSegment.departure.at)}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{firstSegment.departure.iataCode}</div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="text-xs text-muted-foreground">{formatDuration(outbound.duration)}</div>
                          <div className="relative w-full">
                            <div className="absolute w-full top-1/2 border-t border-dashed border-gray-300"></div>
                            <div className="relative flex justify-center">
                              {isMultiSegment ? (
                                // Multiple segments - show dots for stops
                                <div className="flex items-center">
                                  {outbound.segments.map((_, idx) => (
                                    <div key={idx} className="flex items-center">
                                      {idx > 0 && <div className="h-2 w-2 rounded-full bg-orange-500 z-10"></div>}
                                      {idx < outbound.segments.length - 1 && <div className="w-4 border-t border-dashed border-gray-300"></div>}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                // Direct flight
                                <div className="flex items-center">
                                  <ArrowRight className="h-4 w-4 text-primary" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-xs mt-1 text-center">
                            {isMultiSegment ? 
                              `${outbound.segments.length - 1} stop${outbound.segments.length > 2 ? 's' : ''}` : 
                              'Direct'
                            }
                          </div>
                        </div>
                        
                        <div className="text-center md:text-right">
                          <div className="text-xl font-semibold">{formatTime(lastSegment.arrival.at)}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{lastSegment.arrival.iataCode}</div>
                        </div>
                      </div>
                      
                      {/* Price and book button */}
                      <div className="md:col-span-3 flex flex-col items-center md:items-end">
                        <div className="text-2xl font-bold text-primary">£{parseFloat(flight.price.total).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground mb-2">per passenger</div>
                        <Button onClick={() => router.push(`/flights/${flight.id}`)}>View flight details</Button>
                      </div>
                    </div>

                    {/* Flight details toggle */}
                    <div className="mt-4 flex justify-center md:justify-end">
                      <button 
                        onClick={() => toggleFlightDetails(flight.id)}
                        className="text-sm text-primary flex items-center hover:text-primary/80 transition-colors"
                      >
                        {isExpanded ? 'Hide details' : 'Show details'}
                        {isExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                      </button>
                    </div>

                    {/* Expanded flight details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="font-medium mb-2">Flight details</div>
                        
                        {outbound.segments.map((segment, idx) => (
                          <div key={idx} className="mb-4">
                            <div className="flex items-center mb-2">
                              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 mr-2">
                                <span className="text-xs font-semibold">{segment.carrierCode}</span>
                              </div>
                              <span className="text-sm">
                                Flight {segment.number} • {getAirlineName(segment.carrierCode)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex">
                                <div className="mr-4">
                                  <div className="text-lg font-semibold">{formatTime(segment.departure.at)}</div>
                                  <div className="text-xs text-muted-foreground">{formatDate(segment.departure.at)}</div>
                                </div>
                                <div>
                                  <div className="font-medium">{getAirportName(segment.departure.iataCode)}</div>
                                  <div className="text-sm text-muted-foreground">Terminal {segment.departure.terminal || 'N/A'}</div>
                                </div>
                              </div>
                              
                              <div className="flex">
                                <div className="mr-4">
                                  <div className="text-lg font-semibold">{formatTime(segment.arrival.at)}</div>
                                  <div className="text-xs text-muted-foreground">{formatDate(segment.arrival.at)}</div>
                                </div>
                                <div>
                                  <div className="font-medium">{getAirportName(segment.arrival.iataCode)}</div>
                                  <div className="text-sm text-muted-foreground">Terminal {segment.arrival.terminal || 'N/A'}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Duration: {formatDuration(segment.duration)}</span>
                              <span className="mx-2">•</span>
                              <Plane className="h-4 w-4 mr-1" />
                              <span>Aircraft: {segment.aircraft?.code || 'N/A'}</span>
                            </div>
                            
                            {/* Display connection information if not the last segment */}
                            {idx < outbound.segments.length - 1 && (
                              <div className="mt-3 mb-3 py-2 px-3 bg-muted rounded-md">
                                <div className="text-sm font-medium">Connection in {getCityName(segment.arrival.iataCode)}</div>
                                <div className="text-xs text-muted-foreground">
                                  Connection time: {calculateConnectionTime(segment.arrival.at, outbound.segments[idx + 1].departure.at)}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Amenities */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <div className="text-xs flex items-center bg-muted px-2 py-1 rounded">
                            <Luggage className="h-3 w-3 mr-1" />
                            <span>Carry-on bag included</span>
                          </div>
                          <div className="text-xs flex items-center bg-muted px-2 py-1 rounded">
                            <Coffee className="h-3 w-3 mr-1" />
                            <span>In-flight meal</span>
                          </div>
                          <div className="text-xs flex items-center bg-muted px-2 py-1 rounded">
                            <User className="h-3 w-3 mr-1" />
                            <span>Extra legroom</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper function to calculate connection time
function calculateConnectionTime(arrivalTime: string, departureTime: string) {
  const arrival = new Date(arrivalTime);
  const departure = new Date(departureTime);
  
  const diffMs = departure.getTime() - arrival.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${diffHrs}h ${diffMins}m`;
} 