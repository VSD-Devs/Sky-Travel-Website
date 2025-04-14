import { Metadata } from 'next';
import DestinationFlights from '@/components/sections/destinations/DestinationFlights';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Landmark, Hotel, UtensilsCrossed, MapPin, Calendar, Plane } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New York City | Sky Limit Travels',
  description: 'Plan your trip to New York City with Sky Limit Travels. Discover flights, accommodation and experiences in the city that never sleeps.',
};

export default function NewYorkPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3" 
          alt="New York City skyline" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">New York City</h1>
            <p className="text-xl text-white/90 mb-8">
              Experience the energy and iconic sights of the city that never sleeps, from Central Park to Times Square.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Plan Your NYC Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Destination Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About New York City</h2>
            <p className="text-lg text-gray-700 mb-6">
              New York City, the vibrant metropolis on the eastern coast of the United States, is one of the world's most iconic destinations. As a global center for art, fashion, finance, and culture, NYC offers visitors an unparalleled urban experience filled with world-famous landmarks, diverse neighborhoods, and endless entertainment options.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              From the soaring skyscrapers of Manhattan to the cultural enclaves of Brooklyn, each of the city's five boroughs has its own distinct character and attractions. Whether you're catching a Broadway show, exploring world-class museums, dining at renowned restaurants, or simply taking in the city's electric atmosphere, New York promises an unforgettable experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Best Time to Visit</h3>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    Spring (April to June) and fall (September to November) offer pleasant temperatures and fewer crowds. December is magical with holiday decorations, while summer brings warm weather and outdoor events, though it can be humid.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Getting Around</h3>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">
                    New York's extensive subway system is the fastest way to navigate the city. Taxis and rideshares are plentiful, while walking is ideal for exploring specific neighborhoods. The grid layout of Manhattan makes navigation straightforward for visitors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">New York Highlights</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Discover the must-see attractions and experiences that make New York City a world-class destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-4.0.3" alt="Empire State Building" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Iconic Landmarks</h3>
                </div>
                <p className="text-gray-700">
                  Visit world-famous sites like the Empire State Building, Statue of Liberty, Brooklyn Bridge, and the reimagined One World Trade Center.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3" alt="Broadway and Times Square" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Times Square & Broadway</h3>
                </div>
                <p className="text-gray-700">
                  Experience the dazzling lights of Times Square and catch a world-class performance in the renowned Broadway Theater District.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1565101845408-7a1b0da85e0b?ixlib=rb-4.0.3" alt="Central Park" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Central Park</h3>
                </div>
                <p className="text-gray-700">
                  Escape the urban bustle in this 843-acre oasis featuring walking paths, lakes, gardens, and recreational areas in the heart of Manhattan.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?ixlib=rb-4.0.3" alt="Metropolitan Museum of Art" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">World-Class Museums</h3>
                </div>
                <p className="text-gray-700">
                  Explore cultural treasures at the Metropolitan Museum of Art, MoMA, the Natural History Museum, and the Guggenheim.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3" alt="New York Cuisine" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <UtensilsCrossed className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Culinary Experiences</h3>
                </div>
                <p className="text-gray-700">
                  Savor the diverse food scene from quintessential New York pizza and bagels to international cuisine and Michelin-starred restaurants.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1518389661278-9387a71db515?ixlib=rb-4.0.3" alt="New York Neighborhoods" className="w-full h-60 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Diverse Neighborhoods</h3>
                </div>
                <p className="text-gray-700">
                  Wander through distinct areas like Greenwich Village, SoHo, Chinatown, Little Italy, Harlem, and the trendy districts of Brooklyn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flights to New York */}
      <DestinationFlights destination="JFK" destinationName="New York" />
      
      {/* Accommodation Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Where to Stay</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              From luxury hotels to boutique accommodations, find the perfect place to stay in New York City.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3" alt="Luxury Hotel" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Hotel className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Luxury Experience</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Indulge in 5-star accommodations at iconic hotels like The Plaza, The St. Regis, or the Mandarin Oriental with stunning city views.
                </p>
                <div className="text-sm text-gray-500">
                  From £350 per night
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3" alt="Boutique Hotel" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Hotel className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Boutique Charm</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Experience unique character and personalized service at stylish boutique hotels in neighborhoods like SoHo or Chelsea.
                </p>
                <div className="text-sm text-gray-500">
                  From £190 per night
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3" alt="Mid-Range Hotel" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Hotel className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Mid-Range Comfort</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Find excellent value at well-appointed mid-range hotels offering comfortable accommodations in convenient locations.
                </p>
                <div className="text-sm text-gray-500">
                  From £120 per night
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Browse All Accommodation Options
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-700">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience New York?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let our travel specialists help you plan the perfect New York City getaway with personalized recommendations and expert advice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-6 rounded-full text-lg">
                <Plane className="w-5 h-5 mr-2" />
                Book Flights
              </Button>
              <Button className="bg-transparent hover:bg-blue-800 text-white border-2 border-white px-8 py-6 rounded-full text-lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 