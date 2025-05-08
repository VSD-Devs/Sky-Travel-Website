'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowRightLeft, Calendar, ChevronDown, ChevronUp, Clock, Coffee, CreditCard, Info, Luggage, Plane, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlightOffer } from '@/lib/amadeus';
import { useRouter } from 'next/navigation';
import { airports, getAirportByCode, getFormattedLocation } from '@/data/airports';
import EnhancedFlightCard from './components/EnhancedFlightCard';
import EnhancedResultsHeader from './components/EnhancedResultsHeader';
import EnhancedFilterPanel from './components/EnhancedFilterPanel';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightOffer[]>([]);
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

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 1440]); // in minutes
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxStops, setMaxStops] = useState<number>(2);
  const [directOnly, setDirectOnly] = useState<boolean>(false);

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
          setFilteredFlights([]);
          setError('No flights found for this route and date combination. Please try different dates or destinations.');
        } else {
          setFlights(data);
          setFilteredFlights(data);
          
          // Set initial filter ranges based on actual data
          setInitialRanges(data);
          
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
        setFilteredFlights([]);
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

  // Set initial price and duration ranges based on actual data
  const setInitialRanges = (flights: FlightOffer[]) => {
    // Find min/max prices
    let minPrice = Number.MAX_VALUE;
    let maxPrice = 0;
    
    // Find min/max durations (in minutes)
    let minDuration = Number.MAX_VALUE;
    let maxDuration = 0;
    
    // Collect all unique airlines
    const airlines = new Set<string>();
    
    flights.forEach(flight => {
      // Price check
      const price = parseFloat(flight.price.total);
      minPrice = Math.min(minPrice, price);
      maxPrice = Math.max(maxPrice, price);
      
      // Duration check (convert PT format to minutes)
      flight.itineraries.forEach(itinerary => {
        const durationStr = itinerary.duration;
        const hours = parseInt(durationStr.match(/(\d+)H/)?.[1] || '0', 10);
        const minutes = parseInt(durationStr.match(/(\d+)M/)?.[1] || '0', 10);
        const totalMinutes = hours * 60 + minutes;
        
        minDuration = Math.min(minDuration, totalMinutes);
        maxDuration = Math.max(maxDuration, totalMinutes);
      });
      
      // Collect airlines
      flight.itineraries.forEach(itinerary => {
        itinerary.segments.forEach(segment => {
          airlines.add(getAirlineName(segment.carrierCode));
        });
      });
    });
    
    // Set ranges with some padding
    setPriceRange([
      Math.floor(minPrice * 0.9), 
      Math.ceil(maxPrice * 1.1)
    ]);
    
    setDurationRange([
      Math.max(0, Math.floor(minDuration * 0.9)),
      Math.ceil(maxDuration * 1.1)
    ]);
  };

  // Airline mapping function to display full airline names
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

  // Get all available airlines from the flights
  const availableAirlines = useMemo(() => {
    const airlinesSet = new Set<string>();
    
    flights.forEach(flight => {
      flight.itineraries.forEach(itinerary => {
        itinerary.segments.forEach(segment => {
          airlinesSet.add(getAirlineName(segment.carrierCode));
        });
      });
    });
    
    return Array.from(airlinesSet).sort();
  }, [flights]);

  // Apply filters
  useEffect(() => {
    let filtered = [...flights];
    
    // Price filter
    filtered = filtered.filter(flight => {
      const price = parseFloat(flight.price.total);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Duration filter (apply to both outbound and return if applicable)
    filtered = filtered.filter(flight => {
      return flight.itineraries.every(itinerary => {
        const durationStr = itinerary.duration;
        const hours = parseInt(durationStr.match(/(\d+)H/)?.[1] || '0', 10);
        const minutes = parseInt(durationStr.match(/(\d+)M/)?.[1] || '0', 10);
        const totalMinutes = hours * 60 + minutes;
        
        return totalMinutes >= durationRange[0] && totalMinutes <= durationRange[1];
      });
    });
    
    // Airline filter
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(flight => {
        return flight.itineraries.some(itinerary => {
          return itinerary.segments.some(segment => {
            return selectedAirlines.includes(getAirlineName(segment.carrierCode));
          });
        });
      });
    }
    
    // Direct flights filter
    if (directOnly) {
      filtered = filtered.filter(flight => {
        return flight.itineraries.every(itinerary => itinerary.segments.length === 1);
      });
    } else if (maxStops < 2) {
      // Apply max stops filter
      filtered = filtered.filter(flight => {
        return flight.itineraries.every(itinerary => itinerary.segments.length - 1 <= maxStops);
      });
    }
    
    // Sort flights
    filtered = sortFlights(filtered, sortOption);
    
    setFilteredFlights(filtered);
  }, [flights, priceRange, durationRange, selectedAirlines, directOnly, maxStops, sortOption]);

  // Sort flights
  const sortFlights = (flights: FlightOffer[], option: string) => {
    return [...flights].sort((a, b) => {
      if (option === 'price') {
        return parseFloat(a.price.total) - parseFloat(b.price.total);
      } else if (option === 'duration') {
        const getDuration = (duration: string) => {
          const hours = parseInt(duration.match(/(\d+)H/)?.[1] || '0', 10);
          const minutes = parseInt(duration.match(/(\d+)M/)?.[1] || '0', 10);
          return hours * 60 + minutes;
        };
        
        return getDuration(a.itineraries[0].duration) - getDuration(b.itineraries[0].duration);
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

  // Reset all filters
  const handleResetFilters = () => {
    setInitialRanges(flights);
    setSelectedAirlines([]);
    setMaxStops(2);
    setDirectOnly(false);
    setSortOption('price');
  };

  // Handle airline selection
  const handleAirlineChange = (airline: string, selected: boolean) => {
    if (selected) {
      setSelectedAirlines(prev => [...prev, airline]);
    } else {
      setSelectedAirlines(prev => prev.filter(a => a !== airline));
    }
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-pulse">
            <Plane className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">Searching for the best flight deals...</h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we find flights matching your search criteria
          </p>
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
            Return to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with search summary */}
      <EnhancedResultsHeader
        origin={searchDetails.origin}
        destination={searchDetails.destination}
        departureDate={searchDetails.departureDate}
        returnDate={searchDetails.returnDate}
        totalResults={filteredFlights.length}
        adults={searchDetails.adults}
        children={searchDetails.children}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        <div className="md:w-1/4">
          <EnhancedFilterPanel
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            durationRange={durationRange}
            onDurationRangeChange={setDurationRange}
            airlines={availableAirlines}
            selectedAirlines={selectedAirlines}
            onAirlineChange={handleAirlineChange}
            maxStops={maxStops}
            onMaxStopsChange={setMaxStops}
            directOnly={directOnly}
            onDirectOnlyChange={setDirectOnly}
            onReset={handleResetFilters}
          />
        </div>
        
        {/* Flight results */}
        <div className="md:w-3/4">
          {/* Sort options */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredFlights.length}</span> of <span className="font-medium">{flights.length}</span> flights
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm mr-2">Sort by:</span>
                  <select
                    className="rounded-md border px-3 py-1 bg-white text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="price">Price (lowest first)</option>
                    <option value="duration">Duration (shortest first)</option>
                    <option value="departureTime">Departure time (earliest first)</option>
                    <option value="arrivalTime">Arrival time (earliest first)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Flight list */}
          {filteredFlights.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Info className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No flights match your filters</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search for different dates to find available flights.
              </p>
              <Button onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFlights.map((flight) => (
                <EnhancedFlightCard
                  key={flight.id}
                  flight={flight}
                  getAirlineName={getAirlineName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 