'use client';

import { useEffect, useState } from 'react';
import { Plane, Clock, ArrowRight, Sparkles, ArrowRightLeft, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FlightOffer } from '@/lib/amadeus';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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

  // Function to get airline name from code
  const getAirlineName = (code: string): string => {
    const airlines: Record<string, string> = {
      'BA': 'British Airways',
      'AF': 'Air France',
      'LH': 'Lufthansa',
      'IB': 'Iberia',
      'AZ': 'Alitalia',
      'A3': 'Aegean Airlines',
      'TK': 'Turkish Airlines',
      'EZY': 'easyJet',
      'FR': 'Ryanair',
      'W6': 'Wizz Air',
      'U2': 'easyJet',
      'OU': 'Croatia Airlines',
      'UA': 'United Airlines',
      'AA': 'American Airlines',
      'DL': 'Delta Air Lines',
      'EK': 'Emirates',
      'QR': 'Qatar Airways',
      'EY': 'Etihad Airways',
    };
    return airlines[code] || code;
  };

  // Function to get city name from code
  const getCityName = (code: string): string => {
    const airports: Record<string, string> = {
      'CDG': 'Paris, France',
      'MAD': 'Madrid, Spain',
      'FCO': 'Rome, Italy',
      'ATH': 'Athens, Greece',
      'ZAG': 'Zagreb, Croatia',
      'IST': 'Istanbul, Turkey',
      'LHR': 'London, UK',
      'JFK': 'New York, USA',
      'DXB': 'Dubai, UAE',
      'SIN': 'Singapore',
      'HKG': 'Hong Kong',
      'SYD': 'Sydney, Australia',
    };
    return airports[code] || code;
  };

  const countryDestinations = [
    {
      id: 'france',
      name: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=800',
      description: 'Explore the romance of Paris, the French Riviera, and beautiful countryside with direct flights.',
      path: '/flights/countries/france'
    },
    {
      id: 'italy',
      name: 'Italy',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&q=80&w=800',
      description: 'Discover ancient Rome, Renaissance Florence, the canals of Venice and much more.',
      path: '/flights/countries/italy'
    },
    {
      id: 'spain',
      name: 'Spain',
      image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?ixlib=rb-4.0.3&q=80&w=800',
      description: 'Experience vibrant Barcelona, elegant Madrid, sun-soaked beaches and rich culture.',
      path: '/flights/countries/spain'
    },
    {
      id: 'greece',
      name: 'Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&q=80&w=800',
      description: 'Visit stunning islands, ancient ruins and enjoy Mediterranean charm and cuisine.',
      path: '/flights/countries/greece'
    },
    {
      id: 'croatia',
      name: 'Croatia',
      image: '/images/croatia.jpg',
      description: 'Explore medieval walled cities, crystal-clear waters and over 1,000 beautiful islands.',
      path: '/flights/countries/croatia'
    },
    {
      id: 'turkey',
      name: 'Turkey',
      image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&q=80&w=800',
      description: 'Experience the unique blend of East and West, from Istanbul to the stunning Turkish coast.',
      path: '/flights/countries/turkey'
    },
  ];

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
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular Flight Routes</h2>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
              <p className="text-gray-600">
                We're currently experiencing difficulties retrieving flight information. 
                Please try using our flight search tool above to find available flights.
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

  // Display limited flights unless viewAll is true
  const displayedFlights = viewAll ? flights : flights.slice(0, 3);

  return (
    <div className="bg-white py-16">
      {/* Popular Countries Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Countries</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore flights to our most sought-after countries with amazing deals and packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {countryDestinations.map((country) => (
            <Card key={country.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-48">
                <img 
                  src={country.image}
                  alt={`${country.name} scenic view`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{country.name}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-4 min-h-[60px]">
                  {country.description}
                </p>
                
                <Button asChild className="w-full">
                  <Link href={country.path}>
                    Explore {country.name}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Flight Routes Section */}
      {flights.length > 0 && (
        <section className="container mx-auto px-4 bg-gray-50 py-16 rounded-3xl max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Flight Routes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View our top flight routes from London Heathrow with competitive prices
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
                  <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
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
                      <ArrowRightLeft className="w-4 h-4 mr-2 text-blue-600" />
                      <span>London Heathrow ↔ {destinationCity}</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md mb-3">
                      <div className="text-xs font-medium text-blue-800 mb-2">Outbound · {departureDate}</div>
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
                        <Plane className="w-3 h-3 mr-1 text-blue-500" />
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
                          <Plane className="w-3 h-3 mr-1 text-blue-500" />
                          {getAirlineName(returnSegment.carrierCode)} ({returnSegment.carrierCode} {returnSegment.number})
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white"
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
                      Book This Flight
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
                {viewAll ? 'Show Less' : 'View All Flight Routes'}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </section>
      )}
    </div>
  );
} 