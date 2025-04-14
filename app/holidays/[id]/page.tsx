import { Metadata } from 'next';
import DestinationInfo from '@/components/sections/destinations/DestinationInfo';
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
      title: 'Destination Not Found',
      description: 'The requested destination information could not be found.'
    };
  }

  return {
    title: `${destination.name} | Destination Guide`,
    description: `Travel guide for ${destination.name} with flight information, local attractions, and travel tips.`,
    openGraph: {
      title: `${destination.name} | Destination Guide`,
      description: `Travel guide for ${destination.name} with flight information, local attractions, and travel tips.`,
      images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff'],
    },
  };
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  return <DestinationInfo id={params.id} />;
} 