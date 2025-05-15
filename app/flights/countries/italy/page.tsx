'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Clock, Info, MapPin, Calendar, ArrowRight, Sun, Sparkles, Check } from 'lucide-react';
import { FlightOffer } from '@/lib/amadeus';
import FlightSearchForm from '@/components/FlightSearchForm';
import { formatAirportDisplay, formatRouteDisplay, getAirportByCode } from '@/data/airports';

// Popular destinations in Italy
const popularDestinations = [
  {
    id: 'rome',
    name: 'Rome',
    code: 'FCO',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&q=80&w=800',
    description: 'The Eternal City with ancient ruins, Vatican City, Renaissance art and vibrant street life.',
    flightTime: '~2h 30m'
  },
  {
    id: 'venice',
    name: 'Venice',
    code: 'VCE',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-4.0.3&q=80&w=800',
    description: 'Romantic canals, historic architecture and unique atmosphere in this floating city.',
    flightTime: '~2h 15m'
  },
  {
    id: 'florence',
    name: 'Florence',
    code: 'FLR',
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?ixlib=rb-4.0.3&q=80&w=800',
    description: 'The birthplace of the Renaissance with stunning art, architecture and Tuscan cuisine.',
    flightTime: '~2h 20m'
  },
  {
    id: 'milan',
    name: 'Milan',
    code: 'MXP',
    image: 'https://images.unsplash.com/photo-1520440229-6469a149ac59?ixlib=rb-4.0.3&q=80&w=800',
    description: 'Italy\'s fashion and design capital with beautiful Gothic architecture and fine dining.',
    flightTime: '~2h 10m'
  },
];

// Information about Italy
const countryInfo = {
  name: 'Italy',
  flag: '🇮🇹',
  capital: 'Rome',
  language: 'Italian',
  currency: 'Euro (€)',
  timezone: 'GMT+1 (GMT+2 in summer)',
  bestTimeToVisit: 'April to June or September to October',
  visaInfo: 'UK citizens can travel without a visa for up to 90 days in any 180-day period.',
  travelTips: [
    'Many museums and attractions are closed on Mondays',
    'A cover charge (coperto) at restaurants is common and expected',
    'Validate your train tickets before boarding to avoid fines',
    'Dress modestly when visiting churches and religious sites'
  ]
};

export default function ItalyPage() {
  const router = useRouter();
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/country-flights?code=IT');
        
        if (!response.ok) {
          throw new Error('Failed to fetch flights to Italy');
        }
        
        const data = await response.json();
        setFlights(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('Unable to load flights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Function to format flight dates and times
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      fullDate: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  // Function to get airline name from code
  const getAirlineName = (code: string): string => {
    const airlines: Record<string, string> = {
      'BA': 'British Airways',
      'AZ': 'Alitalia',
      'FR': 'Ryanair',
      'U2': 'easyJet',
      'W6': 'Wizz Air',
      'LH': 'Lufthansa',
      'AF': 'Air France',
      'EY': 'Etihad Airways',
      'QR': 'Qatar Airways',
      'EK': 'Emirates',
      'AA': 'American Airlines',
      'DL': 'Delta Air Lines',
      'UA': 'United Airlines',
      'LX': 'Swiss International Air Lines',
    };
    return airlines[code] || code;
  };

  // Function to get airport name from code
  const getAirportName = (code: string): string => {
    const airports: Record<string, string> = {
      'LHR': 'London Heathrow',
      'LGW': 'London Gatwick',
      'STN': 'London Stansted',
      'FCO': 'Rome Fiumicino',
      'CIA': 'Rome Ciampino',
      'MXP': 'Milan Malpensa',
      'LIN': 'Milan Linate',
      'BGY': 'Milan Bergamo',
      'VCE': 'Venice',
      'NAP': 'Naples',
      'PSA': 'Pisa',
      'FLR': 'Florence',
      'CTA': 'Catania',
      'BLQ': 'Bologna',
      'BRI': 'Bari',
    };
    return airports[code] || code;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&q=80&w=800"
              alt="Colosseum in Rome, Italy"
              priority
              fill
              sizes="100vw"
              className="object-cover"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-950/80" />
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-3">
                <span className="text-2xl">{countryInfo.flag}</span>
                <h2 className="text-white font-medium">{countryInfo.name}</h2>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Flights to Italy
              </h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                Experience la dolce vita with direct flights from the UK to stunning Italian destinations
              </p>
            </div>

            {/* Flight Search Form with Prefilled Country */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <FlightSearchForm variant="default" />
            </div>
          </div>
        </div>
      </section>

      {/* Available Flights - Moved up */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Flights to Italy
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Direct flights from the UK to popular Italian destinations
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 rounded-full bg-blue-50">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="mt-4 text-gray-600">Loading available flights...</p>
            </div>
          ) : error ? (
            <div className="max-w-2xl mx-auto text-center py-12 px-4">
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Unable to Load Flights</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white">
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {flights.map((flight) => {
                const outbound = flight.itineraries[0]?.segments[0];
                
                if (!outbound) {
                  return null;
                }
                
                const returnFlight = flight.itineraries[1]?.segments[0];
                const outboundDateTime = formatDateTime(outbound.departure.at);
                const arrivalDateTime = formatDateTime(outbound.arrival.at);
                
                // Get origin and destination cities if available
                const originAirport = getAirportByCode(outbound.departure.iataCode);
                const destinationAirport = getAirportByCode(outbound.arrival.iataCode);
                
                return (
                  <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {formatRouteDisplay(outbound.departure.iataCode, outbound.arrival.iataCode)}
                          </h3>
                          <p className="text-gray-600">
                            {getAirlineName(outbound.carrierCode)} • Round Trip
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <span className="text-3xl font-bold text-blue-600">£{parseFloat(flight.price.total).toFixed(2)}</span>
                          <span className="text-gray-500 text-sm ml-1">per person</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 p-1.5 rounded-full bg-blue-50 mr-3">
                            <Plane className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Departure</div>
                            <div className="font-medium">{outboundDateTime.date} • {outboundDateTime.time}</div>
                            <div className="text-sm">{formatAirportDisplay(outbound.departure.iataCode)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 p-1.5 rounded-full bg-blue-50 mr-3">
                            <MapPin className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Arrival</div>
                            <div className="font-medium">{arrivalDateTime.date} • {arrivalDateTime.time}</div>
                            <div className="text-sm">{formatAirportDisplay(outbound.arrival.iataCode)}</div>
                          </div>
                        </div>
                        
                        {returnFlight && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0 p-1.5 rounded-full bg-blue-50 mr-3">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Return</div>
                              <div className="font-medium">
                                {formatDateTime(returnFlight.departure.at).date}
                              </div>
                              <div className="text-sm">
                                {formatAirportDisplay(returnFlight.departure.iataCode)} to {formatAirportDisplay(returnFlight.arrival.iataCode)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          asChild
                          variant="outline"
                          className="mr-3 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Link href={`/flights/${flight.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button 
                          onClick={() => {
                            const queryParams = new URLSearchParams({
                              origin: outbound.departure.iataCode,
                              destination: outbound.arrival.iataCode,
                              departureDate: outboundDateTime.fullDate,
                              returnDate: returnFlight ? formatDateTime(returnFlight.departure.at).fullDate : ''
                            });
                            router.push(`/contact?${queryParams.toString()}`);
                          }}
                        >
                          Enquire Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
              
              {flights.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-gray-100">
                    <Info className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="mt-4 text-gray-600">No flights available at the moment. Please try again later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Country Information */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                About Italy
              </h2>
              <p className="text-gray-600 mb-6">
                Italy is a country steeped in history, art and culture. From the ancient ruins of Rome to the Renaissance masterpieces of Florence, the romantic canals of Venice to the fashion houses of Milan, Italy offers an incredible diversity of experiences.
              </p>
              <p className="text-gray-600 mb-6">
                With its Mediterranean climate, world-renowned cuisine, and remarkable historical sites, Italy continues to enchant visitors from around the world.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Capital</span>
                    <span className="text-gray-600">{countryInfo.capital}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Language</span>
                    <span className="text-gray-600">{countryInfo.language}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Currency</span>
                    <span className="text-gray-600">{countryInfo.currency}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Time Zone</span>
                    <span className="text-gray-600">{countryInfo.timezone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sun className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Best Time to Visit</span>
                    <span className="text-gray-600">{countryInfo.bestTimeToVisit}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Visa Requirements</span>
                    <span className="text-gray-600">No visa required for UK citizens (up to 90 days)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/5">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Travel Tips for Italy
                </h3>
                <ul className="space-y-3">
                  {countryInfo.travelTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Popular Destinations in Italy
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Explore these amazing Italian destinations with direct flights from the UK
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <Plane className="w-3.5 h-3.5 mr-1" />
                          <span>{destination.flightTime} from London</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 mb-4 text-sm">
                    {destination.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full text-blue-600 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    onClick={() => {
                      const queryParams = new URLSearchParams({
                        destinationCity: destination.name,
                        destination: destination.code
                      });
                      router.push(`/enquire?${queryParams.toString()}`);
                    }}
                  >
                    Enquire Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit Italy */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Why Visit Italy?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Culinary Excellence</h3>
              <p className="text-blue-100">Experience authentic pasta, pizza, gelato and regional specialities that have influenced global cuisine for centuries.</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Artistic Heritage</h3>
              <p className="text-blue-100">Discover the works of Michelangelo, Leonardo da Vinci, Botticelli and many more in museums, churches and galleries.</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diverse Landscapes</h3>
              <p className="text-blue-100">From the rolling hills of Tuscany to the rugged Amalfi Coast, the Dolomite mountains to the canals of Venice.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 