'use client';

import { useEffect, useState } from 'react';
import { Plane, Clock, ArrowRight, Sparkles, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlightOffer } from '@/lib/amadeus';
import { useRouter } from 'next/navigation';

export default function PopularFlights() {
  const router = useRouter();
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('/api/popular-flights');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch flights');
        }
        const data = await response.json();
        
        if (!data || data.length === 0) {
          setFlights([]);
          setError("No flights found. Please try again later.");
        } else {
          setFlights(data);
        }
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError(err instanceof Error ? err.message : 'Failed to load flights');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

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

  // Function to get destination city name from IATA code with country
  const getCityName = (iataCode: string) => {
    const cityMap: Record<string, {city: string, country: string}> = {
      'CDG': { city: 'Paris', country: 'France' },
      'AMS': { city: 'Amsterdam', country: 'Netherlands' },
      'FCO': { city: 'Rome', country: 'Italy' },
      'MAD': { city: 'Madrid', country: 'Spain' },
      'JFK': { city: 'New York', country: 'USA' },
      'LHR': { city: 'London', country: 'UK' },
      'DXB': { city: 'Dubai', country: 'UAE' },
      'SIN': { city: 'Singapore', country: 'Singapore' },
      'HND': { city: 'Tokyo', country: 'Japan' },
      'SYD': { city: 'Sydney', country: 'Australia' },
    };
    return cityMap[iataCode] ? `${cityMap[iataCode].city}, ${cityMap[iataCode].country}` : iataCode;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="inline-block p-4 rounded-lg bg-white shadow-md">
              <div className="flex items-center space-x-3">
                <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-700">Loading popular flights...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular Flights</h2>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
              <p className="text-gray-600">
                We're currently experiencing difficulties retrieving flight information. 
                Please check back later or explore our travel destinations below.
              </p>
              <p className="text-sm text-red-600 mt-2">
                {error}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (flights.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular Flights</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">
                There are no flights available at the moment. 
                Please check back later or browse our destination guides below.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display limited flights unless viewAll is true
  const displayedFlights = viewAll ? flights : flights.slice(0, 3);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular Flights</h2>
          <p className="text-gray-600">
            Discover our most sought-after routes from London Heathrow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedFlights.map((flight) => {
            // Get outbound flight (first itinerary)
            const outboundSegment = flight.itineraries[0]?.segments[0];
            
            // Get return flight (second itinerary) if available
            const returnSegment = flight.itineraries[1]?.segments[0];
            
            if (!outboundSegment) return null;
            
            const departureTime = new Date(outboundSegment.departure.at).toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            
            const arrivalTime = new Date(outboundSegment.arrival.at).toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            
            // Format departure date
            const departureDate = new Date(outboundSegment.departure.at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short'
            });

            // Get destination city name
            const destinationCity = getCityName(outboundSegment.arrival.iataCode);
            
            return (
              <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-transparent hover:border-blue-100">
                <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{destinationCity}</h3>
                    <div className="text-sm opacity-90">Return Flight</div>
                  </div>
                  <div className="text-xl font-bold">
                    £{parseFloat(flight.price.total).toFixed(2)}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center text-sm text-gray-600">
                    <ArrowRightLeft className="w-4 h-4 mr-2 text-blue-500" />
                    <span>London Heathrow ↔ {destinationCity}</span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-md mb-3">
                    <div className="text-xs font-medium text-blue-700 mb-2">Outbound · {departureDate}</div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600">
                        <div className="font-medium">{outboundSegment.departure.iataCode}</div>
                        <div>{departureTime}</div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-500">{outboundSegment.duration.replace('PT', '')}</span>
                      </div>
                      <div className="text-gray-600 text-right">
                        <div className="font-medium">{outboundSegment.arrival.iataCode}</div>
                        <div>{arrivalTime}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <Plane className="w-3 h-3 mr-1 text-blue-400" />
                      {getAirlineName(outboundSegment.carrierCode)} ({outboundSegment.carrierCode} {outboundSegment.number})
                    </div>
                  </div>
                  
                  {returnSegment && (
                    <div className="bg-gray-50 p-3 rounded-md mb-3">
                      <div className="text-xs font-medium text-gray-700 mb-2">
                        Return · {new Date(returnSegment.departure.at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600">
                          <div className="font-medium">{returnSegment.departure.iataCode}</div>
                          <div>{new Date(returnSegment.departure.at).toLocaleTimeString('en-GB', { 
                            hour: '2-digit', minute: '2-digit' 
                          })}</div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-gray-500">{returnSegment.duration.replace('PT', '')}</span>
                        </div>
                        <div className="text-gray-600 text-right">
                          <div className="font-medium">{returnSegment.arrival.iataCode}</div>
                          <div>{new Date(returnSegment.arrival.at).toLocaleTimeString('en-GB', { 
                            hour: '2-digit', minute: '2-digit' 
                          })}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 flex items-center">
                        <Plane className="w-3 h-3 mr-1 text-blue-400" />
                        {getAirlineName(returnSegment.carrierCode)} ({returnSegment.carrierCode} {returnSegment.number})
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
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
                    Enquire Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {flights.length > 3 && (
          <div className="text-center mt-10">
            <Button 
              onClick={() => setViewAll(!viewAll)} 
              variant="outline" 
              className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 hover:border-blue-300"
            >
              {viewAll ? 'Show Less' : 'View All Flights'}
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
} 