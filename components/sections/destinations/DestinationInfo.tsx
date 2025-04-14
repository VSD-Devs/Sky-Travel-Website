'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Calendar, Clock, Users, Heart, Share2, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { holidaysData } from '@/data/holidays';

export default function DestinationInfo({ id }: { id: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullItinerary, setShowFullItinerary] = useState(false);

  const holiday = holidaysData[id];

  if (!holiday) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
        <p className="text-gray-600 mb-6">The requested destination information could not be found.</p>
        <Button asChild>
          <Link href="/destinations">Browse All Destinations</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src={holiday.mainImage}
            alt={holiday.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{holiday.name}</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4">{holiday.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {holiday.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {holiday.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {holiday.groupSize} people
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                {holiday.rating} ({holiday.reviewCount} reviews)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Gallery</h2>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image 
                  src={selectedImageIndex === 0 ? holiday.mainImage : holiday.gallery[selectedImageIndex - 1]}
                  alt={`${holiday.name} - Image ${selectedImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              
              <div className="flex overflow-x-auto space-x-2 py-2">
                <button 
                  onClick={() => setSelectedImageIndex(0)}
                  className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 ${selectedImageIndex === 0 ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <Image 
                    src={holiday.mainImage}
                    alt={`${holiday.name} - Thumbnail 1`}
                    width={96}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {holiday.gallery.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImageIndex(index + 1)}
                    className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index + 1 ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    <Image 
                      src={image}
                      alt={`${holiday.name} - Thumbnail ${index + 2}`}
                      width={96}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About This Destination</h2>
              <p className="text-gray-700 leading-relaxed">{holiday.description}</p>
            </div>
            
            {/* Highlights */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {holiday.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 w-6 h-6 rounded-full text-sm font-bold mr-3 shrink-0">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Itinerary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Sample Itinerary</h2>
              <div className="space-y-4">
                {(showFullItinerary ? holiday.itinerary : holiday.itinerary.slice(0, 2)).map((day, index) => (
                  <Card key={index} className="bg-gray-50 border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-semibold">{day.title}</h3>
                      </div>
                      <ul className="space-y-2 pl-14">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-700">• {activity}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
                
                {holiday.itinerary.length > 2 && (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2" 
                    onClick={() => setShowFullItinerary(!showFullItinerary)}
                  >
                    {showFullItinerary ? 'Show Less' : 'View Full Itinerary'}
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${showFullItinerary ? 'rotate-180' : ''}`} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking & Info */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="bg-white shadow-lg border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-blue-600 p-6 text-white">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold">£{holiday.price}</span>
                    <span className="text-sm opacity-75">per person</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{holiday.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-medium">{holiday.groupSize} people</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium flex items-center">
                        {holiday.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-1" />
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Button className="w-full">Check Availability</Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Heart className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Related Destinations Suggestion */}
            <Card className="bg-gray-50 border-none shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Need More Options?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore all our destinations to find your perfect travel experience.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/destinations">View All Destinations</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 