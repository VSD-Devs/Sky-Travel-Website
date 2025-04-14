import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ArrowRightIcon, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Destinations | Sky Limit Travels',
  description: 'Explore our curated collection of holiday destinations across Europe, Asia, Africa, the Americas, and Oceania. Find your perfect getaway with Sky Limit Travels.',
};

// Continents data
const continents = [
  {
    id: 'europe',
    name: 'Europe',
    image: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    description: 'Discover the rich history, diverse cultures, and stunning landscapes of Europe. From the romantic streets of Paris to the sun-soaked beaches of Greece.',
    destinations: ['Santorini', 'Barcelona', 'Amalfi Coast', 'Swiss Alps', 'Paris', 'Prague']
  },
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.unsplash.com/photo-1540483761890-a1f7be05d99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    description: 'Experience the ancient traditions, vibrant cultures, and breathtaking natural wonders of Asia. From the temples of Japan to the beaches of Bali.',
    destinations: ['Bali', 'Kyoto', 'Maldives', 'Hanoi', 'Bangkok', 'Tokyo']
  },
  {
    id: 'africa',
    name: 'Africa',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    description: 'Explore the untamed wilderness, ancient cultures, and pristine beaches of Africa. From thrilling safaris to relaxing coastal retreats.',
    destinations: ['Cape Town', 'Serengeti', 'Marrakech', 'Zanzibar', 'Victoria Falls', 'Cairo']
  },
  {
    id: 'americas',
    name: 'Americas',
    image: 'https://images.unsplash.com/photo-1543581377-db99be92c50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    description: 'Discover the incredible diversity of the Americas, from the vibrant cities of North America to the ancient ruins and rainforests of South America.',
    destinations: ['New York', 'Costa Rica', 'Rio de Janeiro', 'Machu Picchu', 'Vancouver', 'Mexico City']
  },
  {
    id: 'oceania',
    name: 'Oceania',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    description: 'Experience the stunning natural beauty of Oceania, from Australia\'s vibrant cities and outback to New Zealand\'s dramatic landscapes and the idyllic islands of the South Pacific.',
    destinations: ['Sydney', 'New Zealand', 'Fiji', 'Great Barrier Reef', 'Bora Bora', 'Tasmania']
  }
];

export default function DestinationsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="World destinations" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Explore Our Destinations</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover handpicked destinations across all continents. Start your journey to extraordinary places with Sky Limit Travels.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Start Planning Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Continents Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Explore By Continent</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Each continent offers unique experiences, cultures, and landscapes. Choose your dream destination and let us help you create unforgettable memories.
            </p>
          </div>

          <div className="space-y-20">
            {continents.map((continent, index) => (
              <div key={continent.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="relative overflow-hidden rounded-xl shadow-xl group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
                  <img 
                    src={continent.image} 
                    alt={`${continent.name} destinations`} 
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 z-20">
                    <h3 className="text-3xl font-bold text-white mb-2">{continent.name}</h3>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">{continent.name}</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {continent.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Popular Destinations</h4>
                    <div className="flex flex-wrap gap-2">
                      {continent.destinations.map((destination, destIndex) => (
                        <Link 
                          key={destIndex} 
                          href={
                            destination === 'New York' 
                              ? '/destinations/americas/new-york' 
                              : `/destinations/${continent.id}`
                          }
                          className="bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded-full text-gray-700 hover:text-blue-700 transition-colors"
                        >
                          {destination}
                          {destination === 'New York' && (
                            <span className="ml-1 text-xs font-semibold text-blue-600">(Flights)</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/destinations/${continent.id}`}>
                      Explore {continent.name} <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations with Flights */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured Destinations with Flights</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Explore our handpicked destinations with available flights. Plan your complete trip with Sky Limit Travels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/destinations/americas/new-york" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3" 
                    alt="New York City" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-xl font-bold text-white">New York City, USA</h3>
                      <div className="flex items-center bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-semibold">
                        From £750
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Experience the energy and iconic sights of the city that never sleeps, from Central Park to Times Square.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-blue-600">
                      <Plane className="w-4 h-4 mr-1" />
                      <span>Flights Available</span>
                    </div>
                    <span className="text-blue-600 font-medium group-hover:underline">View Details</span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Other destinations can be added here */}
          </div>
        </div>
      </section>

      {/* Why Travel With Us Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Travel With Sky Limit</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              We're dedicated to creating extraordinary travel experiences tailored to your preferences and dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Expertly Curated</h3>
                <p className="text-gray-600">
                  Our destinations and itineraries are carefully selected and crafted by travel specialists with local knowledge and experience.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">24/7 Support</h3>
                <p className="text-gray-600">
                  Travel with peace of mind knowing our dedicated support team is available around the clock to assist with any questions or concerns.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Tailored Experiences</h3>
                <p className="text-gray-600">
                  We understand that every traveller is unique. That's why we offer personalised itineraries that match your interests and preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Browse our destinations, choose your dream location, and let us handle the rest. Your unforgettable journey awaits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/plan-trip">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-lg">
                Plan Your Trip
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 