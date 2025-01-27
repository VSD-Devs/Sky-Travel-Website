import { Metadata } from 'next';
import HolidayDetails from '@/components/sections/holidays/HolidayDetails';
import { holidaysData } from '@/data/holidays';

// Hardcoded destinations for demonstration
const destinations = [
  { id: '1', name: 'Santorini, Greece' },
  { id: '2', name: 'Bali, Indonesia' },
  { id: '3', name: 'Maldives' },
  { id: '4', name: 'Swiss Alps' }
];

export function generateStaticParams() {
  // Return hardcoded IDs for demonstration
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const destination = destinations.find(d => d.id === params.id);
  
  if (!destination) {
    return {
      title: 'Holiday Not Found',
      description: 'The requested holiday destination could not be found.'
    };
  }

  return {
    title: `${destination.name} | Luxury Travel Experience`,
    description: `Experience the magic of ${destination.name} with our carefully curated tour. Book your dream vacation today!`,
    openGraph: {
      title: `${destination.name} | Luxury Travel Experience`,
      description: `Experience the magic of ${destination.name} with our carefully curated tour.`,
      images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff'],
    },
  };
}

export default function HolidayPage({ params }: { params: { id: string } }) {
  return <HolidayDetails id={params.id} />;
} 