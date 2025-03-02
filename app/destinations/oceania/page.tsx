import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Oceania Destinations | Sky Limit Travels',
  description: 'Explore the stunning islands and natural wonders of Oceania. From the vibrant cities of Australia to the pristine beaches of the South Pacific.',
};

// Featured Oceania destinations
const oceaniaDestinations = [
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3',
    price: '2,199',
    rating: 4.8,
    description: 'Experience the iconic harbour, stunning beaches, and vibrant culture of Australia\'s most famous city.',
    duration: '8 Days',
    groupSize: '4-12',
    highlights: ['Sydney Opera House', 'Bondi Beach', 'Harbour Bridge Climb', 'Blue Mountains Day Trip']
  },
  {
    id: 'new-zealand',
    name: 'New Zealand Adventure',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3',
    price: '2,899',
    rating: 4.9,
    description: 'Discover breathtaking landscapes from the North to South Island in this land of stunning natural beauty.',
    duration: '12 Days',
    groupSize: '6-10',
    highlights: ['Milford Sound', 'Rotorua Geothermal Parks', 'Queenstown Adventure Sports', 'Hobbiton Movie Set']
  },
  {
    id: 'fiji',
    name: 'Fiji Islands',
    image: 'https://images.unsplash.com/photo-1566761011509-57c61052da92?ixlib=rb-4.0.3',
    price: '1,999',
    rating: 4.8,
    description: 'Relax in paradise with crystal-clear waters, white sand beaches, and the legendary hospitality of Fiji.',
    duration: '7 Days',
    groupSize: '2-8',
    highlights: ['Yasawa Islands', 'Coral Reef Snorkeling', 'Traditional Kava Ceremony', 'Sunset Sailing']
  },
  {
    id: 'great-barrier-reef',
    name: 'Great Barrier Reef, Australia',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
    price: '2,399',
    rating: 4.7,
    description: 'Explore the world\'s largest coral reef system, teeming with marine life and natural wonder.',
    duration: '9 Days',
    groupSize: '4-10',
    highlights: ['Scuba Diving', 'Reef Helicopter Tour', 'Cairns Exploration', 'Daintree Rainforest']
  }
];

export default function OceaniaDestinations() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Oceania landscapes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Explore Oceania</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover a paradise of islands, vibrant cities, and natural wonders in the vast expanse of the South Pacific.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Plan Your Oceania Adventure
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Oceania Holiday Destinations</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Oceania encompasses Australia, New Zealand, and the tropical islands of the South Pacific, offering an 
              incredible range of experiences from wild outback adventures to tranquil island retreats. This vast region 
              is renowned for its stunning natural beauty, unique wildlife, and warm, welcoming cultures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3" 
                alt="Australian outback" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Island Paradise</h3>
              <p className="text-gray-600 mb-6">
                The South Pacific is home to thousands of islands, each with its own unique character and beauty. 
                From the volcanic peaks of Bora Bora to the pristine beaches of Fiji, these island paradises 
                offer the perfect escape with their turquoise waters, swaying palms, and vibrant coral reefs.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Spectacular Landscapes</h3>
              <p className="text-gray-600 mb-6">
                From the rugged mountains and fjords of New Zealand to the vast Australian Outback, Oceania boasts 
                some of the world's most dramatic and diverse landscapes. Explore ancient rainforests, stunning coastal 
                scenery, and otherworldly geological formations throughout the region.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Unique Wildlife</h3>
              <p className="text-gray-600">
                Australia and New Zealand are renowned for their unusual native species, many of which evolved in 
                isolation and cannot be found elsewhere. From kangaroos and koalas to kiwis and kakapos, the wildlife 
                of Oceania is captivating and often unexpected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Things to Do in Oceania</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Whether you're seeking adventure, relaxation, or cultural experiences, Oceania offers endless possibilities for creating unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-4.0.3" 
                  alt="Marine adventures"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Marine Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    Explore the underwater wonders of the region with snorkelling, diving, and sailing experiences among vibrant coral reefs and marine life.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Great Barrier Reef, Bora Bora, Fiji</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1578637387939-43c525550085?ixlib=rb-4.0.3" 
                  alt="Adventure sports"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Adventure Activities</h3>
                  <p className="text-gray-600 mb-4">
                    Get your adrenaline pumping with bungee jumping, skydiving, white water rafting, and other thrilling experiences in natural settings.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Queenstown, Cairns, Rotorua</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1526915225318-2f22b370d31c?ixlib=rb-4.0.3" 
                  alt="Cultural experiences"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Cultural Immersion</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with the rich Indigenous cultures of the region, from Aboriginal traditions to Māori ceremonies and Polynesian performances.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Uluru, Rotorua, Samoa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Holidays Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured Oceania Holidays</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Our handcrafted selection of Oceania experiences, designed to showcase the incredible diversity and natural splendour of this unique region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {oceaniaDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-1 shadow-lg">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{destination.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{destination.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">From</span>
                        <p className="text-xl font-bold text-blue-600">£{destination.price}</p>
                      </div>
                      <Link href={`/holidays/${destination.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/holidays">
              <Button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-2 rounded-full">
                View All Oceania Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 