'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

const destinations = [
  {
    id: 1,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3',
    price: '1,299',
    rating: 4.8,
    description: 'Experience the stunning white architecture and breathtaking sunsets',
    duration: '7 Days',
    groupSize: '8-12'
  },
  {
    id: 2,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3',
    price: '899',
    rating: 4.7,
    description: 'Discover tropical beaches and rich cultural heritage',
    duration: '10 Days',
    groupSize: '6-10'
  },
  {
    id: 3,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3',
    price: '1,599',
    rating: 4.9,
    description: 'Luxury overwater villas in crystal clear waters',
    duration: '8 Days',
    groupSize: '2-4'
  },
  {
    id: 4,
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3',
    price: '2,199',
    rating: 4.8,
    description: 'Experience the majestic mountains and pristine lakes',
    duration: '6 Days',
    groupSize: '4-8'
  }
];

export default function FeaturedDestinations() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 400;
    const newScrollPosition = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    scrollRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Featured Destinations
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our hand-picked destinations for your next adventure. Each location carefully selected for unforgettable experiences.
          </p>
        </div>
        
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="min-w-[350px] snap-center"
              >
                <Card className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{destination.rating}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{destination.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{destination.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{destination.groupSize} people</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Starting from</span>
                          <p className="text-2xl font-bold text-blue-600">£{destination.price}</p>
                        </div>
                        <Link href={`/holidays/${destination.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}