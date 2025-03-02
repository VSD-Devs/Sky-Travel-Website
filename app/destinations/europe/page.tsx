import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'European Destinations | Sky Limit Travels',
  description: 'Discover beautiful holiday destinations across Europe. From romantic cities to stunning beaches, find your perfect European getaway.',
};

// Featured European destinations
const europeanDestinations = [
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3',
    price: '1,299',
    rating: 4.8,
    description: 'Experience the stunning white architecture and breathtaking sunsets of this iconic Greek island.',
    duration: '7 Days',
    groupSize: '8-12',
    highlights: ['Oia Sunset Views', 'Caldera Boat Tour', 'Black Sand Beaches', 'Ancient Akrotiri']
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?ixlib=rb-4.0.3',
    price: '1,499',
    rating: 4.7,
    description: 'Explore the dramatic cliffs and colourful villages along Italy\'s most beautiful coastline.',
    duration: '8 Days',
    groupSize: '6-10',
    highlights: ['Positano', 'Ravello Gardens', 'Capri Island Excursion', 'Limoncello Tasting']
  },
  {
    id: 'barcelona',
    name: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3',
    price: '899',
    rating: 4.6,
    description: 'Discover the unique architecture, vibrant culture and superb cuisine of Catalonia\'s capital.',
    duration: '5 Days',
    groupSize: '4-12',
    highlights: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter', 'La Rambla']
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3',
    price: '2,199',
    rating: 4.8,
    description: 'Experience the majestic mountains, pristine lakes and charming villages of Switzerland.',
    duration: '6 Days',
    groupSize: '4-8',
    highlights: ['Matterhorn Views', 'Alpine Villages', 'Lake Geneva', 'Glacier Express']
  }
];

export default function EuropeDestinations() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="/images/europe.jpg"
          alt="European landscapes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl bg-black/30 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">Discover Europe</h1>
            <p className="text-xl text-white mb-8 drop-shadow-md">
              Explore the diverse cultures, stunning landscapes, and historic treasures of Europe's most enchanting destinations.
            </p>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 rounded-full text-lg">
              Plan Your European Adventure
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">European Holiday Destinations</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Europe offers an incredible array of experiences, from the sun-soaked beaches of the Mediterranean to the snow-capped peaks of the Alps. 
              Immerse yourself in thousands of years of history, savour world-renowned cuisine, and explore picture-perfect landscapes 
              that have inspired artists and poets for centuries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3" 
                alt="European cityscape" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Rich History & Culture</h3>
              <p className="text-gray-600 mb-6">
                From ancient Roman ruins to Renaissance masterpieces, Europe's cultural heritage is unparalleled. 
                Wander through world-class museums, marvel at architectural wonders, and experience traditions 
                that have evolved over centuries.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Diverse Landscapes</h3>
              <p className="text-gray-600 mb-6">
                Discover dramatic coastlines, rolling vineyards, lush forests, and majestic mountain ranges—all within 
                easy reach of one another. Europe's compact nature makes it possible to experience remarkably different 
                environments in a single holiday.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Culinary Excellence</h3>
              <p className="text-gray-600">
                Indulge in gastronomic delights from rustic farm-to-table specialties to Michelin-starred cuisine. 
                Each region offers distinct flavours and culinary traditions waiting to be savoured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Things to Do in Europe</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Whether you're seeking relaxation, adventure, culture or cuisine, Europe offers endless possibilities for memorable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1551818905-29c07d4802d0?ixlib=rb-4.0.3" 
                  alt="Historic sightseeing"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Explore Historic Sites</h3>
                  <p className="text-gray-600 mb-4">
                    Step back in time at ancient ruins, medieval castles, and grand palaces that tell the story of Europe's fascinating past.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Rome, Athens, Prague</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?ixlib=rb-4.0.3" 
                  alt="Alpine adventures"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Alpine Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    Ski down pristine slopes in winter or hike through meadows dotted with wildflowers in summer in Europe's stunning mountain ranges.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Swiss Alps, French Alps, Dolomites</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3" 
                  alt="Food and wine"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Culinary Tours</h3>
                  <p className="text-gray-600 mb-4">
                    Sample local delicacies, tour vineyards, and learn culinary secrets with cooking classes across Europe's gastronomy capitals.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Paris, Florence, San Sebastián</span>
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
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured European Holidays</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Our hand-picked selection of unforgettable European getaways, crafted to provide authentic experiences and lifelong memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {europeanDestinations.map((destination) => (
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
                View All European Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 