import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'African Destinations | Sky Limit Travels',
  description: 'Discover the magic of African holiday destinations. From stunning safaris to pristine beaches, experience the diverse beauty of Africa.',
};

// Featured African destinations
const africanDestinations = [
  {
    id: 'cape-town',
    name: 'Cape Town, South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3',
    price: '1,499',
    rating: 4.8,
    description: 'Experience the stunning blend of mountains, coastlines, and vibrant urban culture in this jewel of South Africa.',
    duration: '8 Days',
    groupSize: '6-12',
    highlights: ['Table Mountain', 'Cape Peninsula', 'Robben Island', 'Wine Country Tour']
  },
  {
    id: 'serengeti',
    name: 'Serengeti National Park, Tanzania',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3',
    price: '2,899',
    rating: 4.9,
    description: 'Witness the incredible wildlife and breathtaking landscapes of one of Africa\'s most iconic safari destinations.',
    duration: '7 Days',
    groupSize: '4-10',
    highlights: ['Great Migration', 'Big Five Safari', 'Hot Air Balloon Ride', 'Maasai Village Visit']
  },
  {
    id: 'marrakech',
    name: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1548018560-c7196548c799?ixlib=rb-4.0.3',
    price: '1,199',
    rating: 4.7,
    description: 'Explore the vibrant medinas, historic palaces, and bustling markets of this enchanting North African city.',
    duration: '6 Days',
    groupSize: '4-12',
    highlights: ['Jemaa el-Fnaa Square', 'Bahia Palace', 'Majorelle Garden', 'Atlas Mountains Day Trip']
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar, Tanzania',
    image: 'https://images.unsplash.com/photo-1586500452886-56edb2a88dc3?ixlib=rb-4.0.3',
    price: '1,599',
    rating: 4.8,
    description: 'Relax on pristine white sand beaches and explore the historic Stone Town of this idyllic island paradise.',
    duration: '9 Days',
    groupSize: '2-8',
    highlights: ['Stone Town', 'Spice Tour', 'Dolphin Watching', 'Prison Island']
  }
];

export default function AfricaDestinations() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3" 
          alt="African savannah" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Explore Africa</h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the untamed wilderness, ancient traditions, and vibrant cultures of Africa's most breathtaking destinations.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg">
              Plan Your African Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">African Holiday Destinations</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Africa offers an unparalleled range of experiences, from thrilling wildlife encounters to relaxing beach retreats.
              Immerse yourself in the continent's rich cultural heritage, stunning landscapes, and warm hospitality on your next adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3" 
                alt="African wildlife" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Incredible Wildlife</h3>
              <p className="text-gray-600 mb-6">
                Home to some of the world's most spectacular wildlife, Africa offers unparalleled safari experiences. 
                Witness the Great Migration in the Serengeti, track gorillas in Rwanda's forests, or spot the Big Five 
                in South Africa's renowned game reserves.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Diverse Landscapes</h3>
              <p className="text-gray-600 mb-6">
                From the rolling dunes of the Sahara to the lush rainforests of Central Africa, the continent's landscapes 
                are as diverse as they are breathtaking. Trek the snow-capped peak of Mount Kilimanjaro or relax on the 
                pristine beaches of Zanzibar.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Rich Cultural Heritage</h3>
              <p className="text-gray-600">
                With thousands of distinct ethnic groups across the continent, Africa's cultural heritage is incredibly rich 
                and varied. Experience ancient traditions, vibrant music and dance, colourful markets, and the legendary 
                hospitality of the African people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Things to Do in Africa</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              From adrenaline-pumping adventures to cultural immersions, Africa offers extraordinary experiences for every type of traveller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3" 
                  alt="Safari experience"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Safari Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    Embark on thrilling game drives to observe Africa's iconic wildlife in their natural habitats, from elephants and lions to giraffes and zebras.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Serengeti, Kruger, Maasai Mara</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3" 
                  alt="Cultural experiences"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Cultural Immersion</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with local communities, learn about traditional ways of life, and participate in authentic cultural experiences across the continent.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Morocco, Ethiopia, South Africa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1535941339077-2dd684200e85?ixlib=rb-4.0.3" 
                  alt="Beach relaxation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Coastal Escapes</h3>
                  <p className="text-gray-600 mb-4">
                    Unwind on some of the world's most beautiful and uncrowded beaches, with crystal-clear waters and stunning marine life.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Zanzibar, Seychelles, Mozambique</span>
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
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured African Holidays</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Our thoughtfully selected collection of African adventures, designed to showcase the continent's incredible diversity and beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {africanDestinations.map((destination) => (
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
                View All African Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 