import { NextResponse } from 'next/server';
import { getPopularFlights } from '@/lib/amadeus';

export async function GET() {
  try {
    const flights = await getPopularFlights();
    return NextResponse.json(flights);
  } catch (error) {
    console.error('Error in popular flights API:', error);
    const errorMessage = error instanceof Error 
      ? `${error.name}: ${error.message}` 
      : 'Failed to fetch popular flights';
    
    return NextResponse.json(
      { error: errorMessage, details: JSON.stringify(error) },
      { status: 500 }
    );
  }
} 