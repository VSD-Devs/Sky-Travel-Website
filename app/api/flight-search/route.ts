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
    // Get search parameters from URL
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin') || 'LHR';
    const destination = searchParams.get('destination') || '';
    const departureDate = searchParams.get('departureDate') || '';
    const returnDate = searchParams.get('returnDate') || '';
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';

    console.log('Flight search parameters:', {
      origin, destination, departureDate, returnDate, adults, children
    });

    // In a production environment, we would use this code to call the Amadeus API
    // However, for testing purposes, we're using mock data
    /*
    // Set up parameters for the API call
    let searchParams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: adults
    };
    
    // Add returnDate if it exists (for round trips)
    if (returnDate) {
      searchParams = {
        ...searchParams,
        returnDate: returnDate
      };
    }
    
    // Add children if there are any
    if (parseInt(children) > 0) {
      searchParams = {
        ...searchParams,
        children: children
      };
    }
    
    const response = await amadeus.shopping.flightOffersSearch.get(searchParams);
    return NextResponse.json(response.data);
    */

    // For testing with test credentials, we'll use mock data
    // Customize mock data based on search parameters
    const mockFlights = getMockFlightData();
    
    // Filter flights based on destination if provided
    // This is only for demonstration - in a real app, the Amadeus API would handle this
    let filteredFlights = mockFlights;
    if (destination && destination.length === 3) {
      filteredFlights = mockFlights.filter(flight => 
        flight.itineraries[0]?.segments[0]?.arrival.iataCode === destination.toUpperCase()
      );
    }

    return NextResponse.json(filteredFlights);
  } catch (error) {
    console.error('Error in flight search API:', error);
    const errorMessage = error instanceof Error 
      ? `${error.name}: ${error.message}` 
      : 'Failed to search for flights';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 