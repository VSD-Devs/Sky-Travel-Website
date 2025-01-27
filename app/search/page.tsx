'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Users, Star, MapPin, SlidersHorizontal } from 'lucide-react';

// Mock data for holiday packages
const MOCK_HOLIDAYS = [
  {
    id: 1,
    destination: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3',
    rating: 4.9,
    reviews: 128,
    price: 1299,
    duration: '7 nights',
    description: 'Luxury overwater villa with stunning ocean views',
    highlights: ['All-inclusive', 'Private beach', 'Spa access'],
    category: 'Luxury'
  },
  {
    id: 2,
    destination: 'Santorini',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3',
    rating: 4.8,
    reviews: 96,
    price: 899,
    duration: '5 nights',
    description: 'Classic Greek villa with caldera views',
    highlights: ['Breakfast included', 'Private pool', 'Sunset views'],
    category: 'Romantic'
  },
  {
    id: 3,
    destination: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3',
    rating: 4.7,
    reviews: 156,
    price: 799,
    duration: '6 nights',
    description: 'Traditional villa in the heart of Ubud',
    highlights: ['Daily yoga', 'Cultural tours', 'Rice field views'],
    category: 'Adventure'
  },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    category: 'all'
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter holidays based on selected filters
  const filteredHolidays = MOCK_HOLIDAYS.filter(holiday => {
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (holiday.price < min || holiday.price > max) return false;
    }
    if (filters.rating !== 'all' && holiday.rating < Number(filters.rating)) return false;
    if (filters.category !== 'all' && holiday.category !== filters.category) return false;
    return true;
  });

  // Sort holidays based on selected sort option
  const sortedHolidays = [...filteredHolidays].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Summary */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              {searchParams.get('destination') || 'Any destination'}
            </div>
            <div className="flex items-center">
              <Plane className="w-4 h-4 mr-2 text-blue-600" />
              {searchParams.get('departureAirport') || 'Any airport'}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              {searchParams.get('departureDate') || 'Flexible dates'}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              {`${searchParams.get('adults') || '1'} Adults, ${searchParams.get('children') || '0'} Children`}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Available Holiday Packages</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filters and Sort Section */}
        <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 ${isFilterOpen ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="0-500">Under £500</option>
                <option value="500-1000">£500 - £1000</option>
                <option value="1000-1500">£1000 - £1500</option>
                <option value="1500-2000">£1500+</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Type</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Luxury">Luxury</option>
                <option value="Romantic">Romantic</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {sortedHolidays.length} holiday packages
        </p>

        {/* Holiday Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHolidays.map((holiday, index) => (
            <motion.div
              key={holiday.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 rounded-t-xl overflow-hidden">
                <img
                  src={holiday.image}
                  alt={holiday.destination}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{holiday.destination}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{holiday.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{holiday.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {holiday.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">£{holiday.price}</span>
                    <span className="text-gray-600 text-sm">/{holiday.duration}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 