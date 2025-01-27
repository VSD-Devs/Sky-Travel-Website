'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const tourPackages = [
  {
    id: 1,
    name: 'European Adventure',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3',
    duration: '10 Days',
    groupSize: '10-15',
    price: '2,499',
    description: 'Explore the best of Europe including Paris, Rome, and Barcelona',
    highlights: ['Guided city tours', 'Luxury accommodations', 'Cultural experiences']
  },
  {
    id: 2,
    name: 'Asian Discovery',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3',
    duration: '12 Days',
    groupSize: '8-12',
    price: '1,999',
    description: 'Journey through Japan, South Korea, and Thailand',
    highlights: ['Local cuisine tours', 'Temple visits', 'Traditional workshops']
  },
  {
    id: 3,
    name: 'Caribbean Escape',
    image: 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3',
    duration: '7 Days',
    groupSize: '6-10',
    price: '1,799',
    description: 'Island hopping adventure in the Caribbean paradise',
    highlights: ['Beach activities', 'Snorkeling tours', 'Sunset cruises']
  },
  {
    id: 4,
    name: 'African Safari',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3',
    duration: '8 Days',
    groupSize: '6-8',
    price: '3,299',
    description: 'Unforgettable wildlife encounters in Tanzania and Kenya',
    highlights: ['Game drives', 'Luxury camping', 'Maasai village visits']
  },
  {
    id: 5,
    name: 'Nordic Lights',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3',
    duration: '6 Days',
    groupSize: '8-10',
    price: '2,799',
    description: 'Chase the Northern Lights in Iceland and Norway',
    highlights: ['Aurora viewing', 'Hot springs', 'Glacier hiking']
  },
  {
    id: 6,
    name: 'South American Trek',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3',
    duration: '14 Days',
    groupSize: '8-12',
    price: '2,999',
    description: 'Explore Machu Picchu and the Amazon rainforest',
    highlights: ['Inca Trail', 'Amazon expedition', 'Local communities']
  }
];

export default function TourPackages() {
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
    <section className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Tour Packages
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Planning for a trip? We will organize your trip with the best places and within best budget!
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
            {tourPackages.map((pack) => (
              <div
                key={pack.id}
                className="min-w-[350px] snap-center"
              >
                <Card className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <img
                        src={pack.image}
                        alt={pack.name}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="font-semibold text-blue-600">£{pack.price}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{pack.name}</h3>
                      <p className="text-gray-600 mb-4">{pack.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{pack.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{pack.groupSize} people</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        {pack.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 transition-all duration-300">
                        Book This Package
                      </Button>
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