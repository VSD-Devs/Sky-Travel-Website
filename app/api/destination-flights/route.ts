import { NextResponse } from 'next/server';
import { getMockFlightData } from '@/lib/amadeus';
import Amadeus from 'amadeus';

// Initialize Amadeus client with test environment
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  hostname: 'test.api.amadeus.com'
});

export async function GET(request: Request) {
  try {
    // Get destination from URL
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination') || '';
    const departureAirport = searchParams.get('origin') || 'LHR';
    const futureMonths = parseInt(searchParams.get('futureMonths') || '6');

    console.log('Destination flight search parameters:', {
      destination, departureAirport, futureMonths
    });

    // For testing with test credentials, we'll use mock data
    const mockFlights = getMockFlightData();
    
    // If no destination specified, return all flights
    if (!destination) {
      return NextResponse.json(mockFlights);
    }

    // Filter mockFlights for the destination
    // In a real implementation, we would call the Amadeus API with the destination
    const destinationFlights = mockFlights.filter(flight => {
      const arrivalCode = flight.itineraries[0]?.segments[0]?.arrival.iataCode;
      return arrivalCode === destination.toUpperCase();
    });

    // Generate additional flights with different dates for this destination
    const generatedFlights = [];
    
    // Use JFK for New York if the destination matches
    const destinationCode = destination.toUpperCase() === 'NYC' ? 'JFK' : destination.toUpperCase();
    
    // Generate mock flights for future months for demonstration
    for (let i = 1; i <= futureMonths; i++) {
      const departureDate = new Date();
      departureDate.setMonth(departureDate.getMonth() + i);
      
      const returnDate = new Date(departureDate);
      returnDate.setDate(returnDate.getDate() + 7);
      
      // Create outbound and return dates
      const formattedDepartureDate = departureDate.toISOString().split('T')[0];
      const formattedReturnDate = returnDate.toISOString().split('T')[0];
      
      // Generate price variations
      const basePrice = 500 + Math.floor(Math.random() * 300);
      
      generatedFlights.push({
        id: `gen-${i}`,
        price: {
          total: basePrice.toFixed(2),
          currency: 'GBP'
        },
        itineraries: [
          {
            segments: [
              {
                departure: {
                  iataCode: departureAirport,
                  terminal: '5',
                  at: `${formattedDepartureDate}T${8 + Math.floor(Math.random() * 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`
                },
                arrival: {
                  iataCode: destinationCode,
                  terminal: '1',
                  at: `${formattedDepartureDate}T${14 + Math.floor(Math.random() * 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`
                },
                carrierCode: ['BA', 'AA', 'UA', 'DL', 'VS'][Math.floor(Math.random() * 5)],
                number: (100 + Math.floor(Math.random() * 900)).toString(),
                duration: 'PT7H30M'
              }
            ]
          },
          {
            segments: [
              {
                departure: {
                  iataCode: destinationCode,
                  terminal: '1',
                  at: `${formattedReturnDate}T${10 + Math.floor(Math.random() * 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`
                },
                arrival: {
                  iataCode: departureAirport,
                  terminal: '5',
                  at: `${formattedReturnDate}T${17 + Math.floor(Math.random() * 6)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`
                },
                carrierCode: ['BA', 'AA', 'UA', 'DL', 'VS'][Math.floor(Math.random() * 5)],
                number: (100 + Math.floor(Math.random() * 900)).toString(),
                duration: 'PT8H15M'
              }
            ]
          }
        ]
      });
    }

    // Return the combination of actual filtered flights and generated flights
    const allFlights = [...destinationFlights, ...generatedFlights];
    
    // Sort by price
    allFlights.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
    
    return NextResponse.json(allFlights);
  } catch (error) {
    console.error('Error in destination flights API:', error);
    const errorMessage = error instanceof Error 
      ? `${error.name}: ${error.message}` 
      : 'Failed to search for destination flights';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 