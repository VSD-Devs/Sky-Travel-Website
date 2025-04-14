import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, MapPin, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'American Destinations | Sky Limit Travels',
  description: 'Explore incredible holiday destinations across North, Central, and South America. From breathtaking natural wonders to vibrant cities.',
};

// Featured American destinations
const americanDestinations = [
  {
    id: 'new-york',
    name: 'New York City, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3',
    price: '1,799',
    rating: 4.7,
    description: 'Experience the energy and iconic sights of the city that never sleeps, from Central Park to Times Square.',
    duration: '6 Days',
    groupSize: '4-12',
    highlights: ['Empire State Building', 'Central Park', 'Brooklyn Bridge', 'Broadway Show']
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1518548419970-58cd00f2ff5c?ixlib=rb-4.0.3',
    price: '1,599',
    rating: 4.9,
    description: 'Discover pristine rainforests, stunning coastlines, and incredible biodiversity in this eco-paradise.',
    duration: '9 Days',
    groupSize: '6-10',
    highlights: ['Arenal Volcano', 'Manuel Antonio National Park', 'Cloud Forest', 'Wildlife Encounters']
  },
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro, Brazil',
    image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-4.0.3',
    price: '1,899',
    rating: 4.8,
    description: 'Experience the vibrant culture, stunning beaches, and breathtaking views of this iconic Brazilian city.',
    duration: '8 Days',
    groupSize: '4-12',
    highlights: ['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Tijuca Forest']
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3',
    price: '2,299',
    rating: 4.9,
    description: 'Journey to the ancient Incan citadel set amidst breathtaking mountain scenery in the Peruvian Andes.',
    duration: '10 Days',
    groupSize: '4-10',
    highlights: ['Inca Trail', 'Sacred Valley', 'Cusco Exploration', 'Local Cultural Experiences']
  }
];

export default function AmericasDestinations() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="/images/americas.webp"
          alt="Americas landscapes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl bg-black/30 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">Discover the Americas</h1>
            <p className="text-xl text-white mb-8 drop-shadow-md">
              From the soaring peaks of the Andes to the bustling streets of New York, explore the extraordinary diversity of the American continents.
            </p>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 rounded-full text-lg">
              Plan Your American Adventure
            </Button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">American Holiday Destinations</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              The Americas offer an incredible range of experiences, from the glaciers of Patagonia to the tropical beaches of the Caribbean.
              With vast wilderness areas, ancient civilisations, and vibrant modern cities, there's something for every traveller to discover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1461863109726-246fa9598dc3?ixlib=rb-4.0.3" 
                alt="Americas natural scenery" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Natural Wonders</h3>
              <p className="text-gray-600 mb-6">
                From the vast Grand Canyon to the thundering Iguazu Falls, the Americas are home to some of the planet's most 
                spectacular natural wonders. Explore rainforests teeming with wildlife, hike through breathtaking mountain 
                ranges, or witness the pristine beauty of the Arctic wilderness.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ancient Civilisations</h3>
              <p className="text-gray-600 mb-6">
                Discover the remnants of powerful pre-Columbian empires, from the mysterious Mayan pyramids to the 
                engineering marvels of the Incas. These ancient sites offer fascinating glimpses into sophisticated 
                civilisations that thrived long before European contact.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Cultural Diversity</h3>
              <p className="text-gray-600">
                Experience the rich tapestry of cultures that make up the Americas today. From the carnival celebrations 
                of Brazil to the cowboy traditions of North America, each region offers unique customs, music, cuisine, 
                and artistic expressions to explore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Do Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Things to Do in the Americas</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Whether you're seeking adventure, relaxation, or cultural immersion, the Americas offer endless possibilities for unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-4.0.3" 
                  alt="National Park adventure"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">National Park Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    Explore incredible protected wilderness areas, from the geysers of Yellowstone to the towering peaks of Torres del Paine.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Yellowstone, Banff, Torres del Paine</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?ixlib=rb-4.0.3" 
                  alt="Urban exploration"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Urban Exploration</h3>
                  <p className="text-gray-600 mb-4">
                    Discover vibrant cities with their own unique character, from the art deco architecture of Miami to the colonial charm of Cartagena.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">New York, Buenos Aires, Mexico City</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1535217097556-3a0f1d522f53?ixlib=rb-4.0.3" 
                  alt="Beach getaways"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Tropical Escapes</h3>
                  <p className="text-gray-600 mb-4">
                    Relax on pristine beaches, snorkel among vibrant coral reefs, and enjoy the laid-back atmosphere of tropical paradises.
                  </p>
                  <div className="flex items-center text-blue-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">Caribbean, Tulum, Galapagos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Featured Americas Holidays</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Our handcrafted selection of Americas experiences, designed to showcase the incredible diversity of landscapes, cultures, and adventures across North, Central, and South America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {americanDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      <div className="flex items-center bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-semibold">
                        £{destination.price}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {destination.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 text-sm">HIGHLIGHTS</h4>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-1">✓</span> {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      asChild
                    >
                      <Link href="/enquire">Book Now</Link>
                    </Button>
                    
                    {/* Add View Flights button that links to the detailed page for each destination */}
                    <Button 
                      variant="outline" 
                      className="flex-1 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      asChild
                    >
                      {destination.id === 'new-york' ? (
                        <Link href="/destinations/americas/new-york">View Flights</Link>
                      ) : (
                        <Link href={`/destinations/americas/${destination.id}`}>Learn More</Link>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 