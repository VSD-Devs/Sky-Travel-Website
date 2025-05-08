import { NextRequest, NextResponse } from 'next/server';
import Amadeus from 'amadeus';
import { LogLevel, logAmadeusEvent, handleAmadeusError, createErrorResponse } from '@/lib/amadeus-error-logger';
import { isRateLimited } from '@/lib/api-rate-limiter';

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

export interface DestinationSearchResult {
  type: string;
  subType: string;
  name: string;
  iataCode: string;
  address?: {
    cityName: string;
    countryName: string;
  };
  cityName?: string;
  countryName?: string;
  displayName: string;
}

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID().substring(0, 8);
  
  // Check rate limits
  const rateLimit = isRateLimited(request, 'destination-search');
  if (!rateLimit.allowed) {
    logAmadeusEvent(
      LogLevel.WARNING,
      'destination-search-api',
      `Rate limit exceeded [${requestId}]: ${rateLimit.reason}`,
      { ip: request.ip, reason: rateLimit.reason }
    );
    
    return createErrorResponse(
      `Rate limit exceeded: ${rateLimit.reason}`,
      429,
      { requestId }
    );
  }
  
  try {
    const { searchParams } = new URL(request.url);
    
    // Get search parameters
    const keyword = searchParams.get('keyword') || '';
    const subType = searchParams.get('subType') || ''; // AIRPORT, CITY, or blank for both
    
    if (!keyword || keyword.length < 2) {
      return createErrorResponse(
        'Please provide a valid search keyword (minimum 2 characters)',
        400,
        { requestId }
      );
    }
    
    // Log search request
    logAmadeusEvent(
      LogLevel.INFO,
      'destination-search-api',
      `Destination search request [${requestId}]: ${keyword}`,
      null,
      { keyword, subType }
    );
    
    // Call the Amadeus API
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: subType || 'AIRPORT,CITY', // Default to both if not specified
      'page[limit]': 20
    });
    
    // Transform the data for easier consumption by the frontend
    const results: DestinationSearchResult[] = response.data.map((item: any) => {
      return {
        type: item.type,
        subType: item.subType,
        name: item.name,
        iataCode: item.iataCode,
        address: item.address,
        cityName: item.address?.cityName,
        countryName: item.address?.countryName,
        displayName: formatDisplayName(item)
      };
    });
    
    // Log successful results
    logAmadeusEvent(
      LogLevel.INFO,
      'destination-search-api',
      `Search completed [${requestId}]: Found ${results.length} destinations`,
      { resultCount: results.length }
    );
    
    return NextResponse.json(results);
  } catch (error) {
    // Handle errors
    const errorDetails = handleAmadeusError(
      error,
      'destination-search-api',
      { requestId, url: request.url }
    );
    
    // For network errors or API unavailability, return local airport data
    if (errorDetails.status >= 500 || errorDetails.error.includes('network')) {
      // Import local airport data
      const { airports } = await import('@/data/airports');
      
      const { searchParams } = new URL(request.url);
      const keyword = searchParams.get('keyword') || '';
      
      // Filter local airports based on the keyword
      const filteredAirports = airports.filter(airport => 
        airport.name.toLowerCase().includes(keyword.toLowerCase()) ||
        airport.city.toLowerCase().includes(keyword.toLowerCase()) ||
        airport.country.toLowerCase().includes(keyword.toLowerCase()) ||
        airport.iataCode.toLowerCase().includes(keyword.toLowerCase())
      ).map(airport => ({
        type: 'location',
        subType: 'AIRPORT',
        name: airport.name,
        iataCode: airport.iataCode,
        cityName: airport.city,
        countryName: airport.country,
        displayName: `${airport.city}, ${airport.country} - ${airport.name} (${airport.iataCode})`
      })).slice(0, 20);
      
      logAmadeusEvent(
        LogLevel.WARNING,
        'destination-search-api',
        `Falling back to local airport data [${requestId}]`,
        { resultsCount: filteredAirports.length, originalError: errorDetails.error }
      );
      
      return NextResponse.json(filteredAirports);
    }
    
    return createErrorResponse(
      errorDetails.error,
      errorDetails.status,
      { ...errorDetails.details, requestId }
    );
  }
}

// Helper function to format display names
function formatDisplayName(item: any): string {
  if (item.subType === 'AIRPORT') {
    return `${item.address?.cityName || ''}, ${item.address?.countryName || ''} - ${item.name} (${item.iataCode})`;
  } else if (item.subType === 'CITY') {
    return `${item.name}, ${item.address?.countryName || ''} (${item.iataCode})`;
  }
  return `${item.name} (${item.iataCode})`;
} 