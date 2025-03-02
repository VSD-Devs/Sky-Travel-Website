import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Asian Destinations | Sky Limit Travels',
  description: 'Explore exotic holiday destinations across Asia. From tranquil beaches to bustling cities, discover the cultural richness of Asia.',
};

// Featured Asian destinations
const asianDestinations = [
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3',
    price: '1,099',
    rating: 4.7,
    description: 'Experience the perfect blend of stunning beaches, lush rice terraces, and vibrant cultural heritage.',
    duration: '10 Days',
    groupSize: '6-10',
    highlights: ['Ubud Sacred Monkey Forest', 'Tegallalang Rice Terraces', 'Uluwatu Temple', 'Kuta Beach']
  },
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3',
    price: '1,899',
    rating: 4.8,
    description: 'Discover ancient temples, traditional tea houses and stunning gardens in Japan\'s cultural heart.',
    duration: '8 Days',
    groupSize: '4-12',
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Temple', 'Gion District']
  },
  {
    id: 'maldives',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3',
    price: '2,299',
    rating: 4.9,
    description: 'Indulge in luxury overwater villas surrounded by crystal clear turquoise waters and white sand beaches.',
    duration: '7 Days',
    groupSize: '2-4',
    highlights: ['Overwater Villa Stay', 'Snorkeling with Manta Rays', 'Sunset Dolphin Cruise', 'Underwater Dining']
  },
  {
    id: 'hanoi',
    name: 'Hanoi, Vietnam',
    image: 'https://images.unsplash.com/photo-1509030450996-9c39ceca9d27?ixlib=rb-4.0.3',
    price: '899',
    rating: 4.6,
    description: 'Explore the chaotic charm of ancient streets, delicious street food, and fascinating Vietnamese culture.',
    duration: '6 Days',
    groupSize: '4-10',
    highlights: ['Old Quarter', 'Halong Bay Day Trip', 'Water Puppet Show', 'Street Food Tour']
  }
];

export default function AsiaDestinations() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?ixlib=rb-4.0.3" 
          alt="Asian landscapes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Experience Asia</h1>
            <p className="text-xl text-white/90 mb-8">
              Immerse yourself in the vibrant cultures, ancient traditions, and breathtaking landscapes of Asia's most captivating destinations.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Discover Asian Adventures
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Asian Holiday Destinations</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Asia offers an extraordinary spectrum of experiences, from the pristine beaches of Southeast Asia to the ancient temples of Japan.
              Whether you seek spiritual enlightenment, culinary adventures, or simply relaxation in paradise, Asia's diverse landscapes and cultures await.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1470004914212-05527e49370b?ixlib=rb-4.0.3" 
                alt="Asian temple" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ancient Traditions</h3>
              <p className="text-gray-600 mb-6">
                Home to some of the world's oldest civilizations, Asia offers a window into ancient traditions that still 
                thrive today. From sacred temples to time-honoured ceremonies, the continent preserves its rich heritage 
                alongside rapid modernisation.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Natural Wonders</h3>
              <p className="text-gray-600 mb-6">
                From the towering Himalayas to the paradise islands of Indonesia, Asia's natural landscapes are as diverse 
                as they are spectacular. Trek through dense jungles, relax on pristine beaches, or marvel at volcanic 
                landscapes unlike anywhere else on Earth.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Culinary Delights</h3>
              <p className="text-gray-600">
                Asian cuisine is celebrated worldwide for its bold flavours and incredible variety. Each country 
                offers its own distinctive culinary traditions, from the street food stalls of Bangkok to the 
                refined sushi counters of Tokyo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Things to Do in Asia</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              From spiritual journeys to thrilling adventures, Asia offers countless experiences for every type of traveller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3" 
                  alt="Temple exploration"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Temple Exploration</h3>
                  <p className="text-gray-600 mb-4">
                    Wander through ancient temples, participate in traditional ceremonies, and gain insight into the spiritual practices that have shaped Asian cultures.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Kyoto, Angkor Wat, Borobudur</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3" 
                  alt="Island hopping"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Island Paradise</h3>
                  <p className="text-gray-600 mb-4">
                    Discover some of the world's most beautiful beaches and island retreats, perfect for snorkelling, diving, or simply unwinding in paradise.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Maldives, Phuket, Bali</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1515668236457-83c3b8764839?ixlib=rb-4.0.3" 
                  alt="Street food"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Culinary Journeys</h3>
                  <p className="text-gray-600 mb-4">
                    Sample authentic dishes from bustling street markets to high-end restaurants, and even learn to prepare local specialties yourself.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Bangkok, Tokyo, Singapore</span>
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
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured Asian Holidays</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Our carefully curated selection of unforgettable Asian holidays, designed to immerse you in authentic experiences and create lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {asianDestinations.map((destination) => (
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
                View All Asian Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 