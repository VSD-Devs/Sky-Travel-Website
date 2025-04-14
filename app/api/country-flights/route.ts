import { NextRequest, NextResponse } from 'next/server';
import { getFlightsToCountry } from '@/lib/amadeus';

export async function GET(request: NextRequest) {
  // Extract country code from query parameters
  const searchParams = request.nextUrl.searchParams;
  const countryCode = searchParams.get('code');
  
  if (!countryCode) {
    return NextResponse.json(
      { error: 'Missing country code parameter' },
      { status: 400 }
    );
  }
  
  try {
    const flights = await getFlightsToCountry(countryCode);
    return NextResponse.json(flights);
  } catch (error) {
    console.error(`Error in country flights API for ${countryCode}:`, error);
    const errorMessage = error instanceof Error 
      ? `${error.name}: ${error.message}` 
      : 'Failed to fetch flights for this country';
    
    return NextResponse.json(
      { error: errorMessage, details: JSON.stringify(error) },
      { status: 500 }
    );
  }
} 