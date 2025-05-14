import { NextRequest, NextResponse } from 'next/server';
import { searchFlights } from '@/lib/amadeus';
import { LogLevel, logAmadeusEvent, handleAmadeusError, createErrorResponse } from '@/lib/amadeus-error-logger';
import { isRateLimited } from '@/lib/api-rate-limiter';

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID().substring(0, 8);
  
  // Check rate limits
  const rateLimit = isRateLimited(request, 'flight-search');
  if (!rateLimit.allowed) {
    logAmadeusEvent(
      LogLevel.WARNING,
      'flight-search-api',
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
    const origin = searchParams.get('origin') || 'LHR';
    const destination = searchParams.get('destination') || '';
    const departureDate = searchParams.get('departureDate') || '';
    const returnDate = searchParams.get('returnDate') || '';
    const adults = searchParams.get('adults') || '1';
    const children = searchParams.get('children') || '0';
    
    const searchParams2 = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      ...(returnDate && { returnDate }),
      adults,
      ...(children !== '0' && { children })
    };
    
    // Log search request
    logAmadeusEvent(
      LogLevel.INFO,
      'flight-search-api',
      `Flight search request [${requestId}]: ${origin} → ${destination}`,
      null,
      searchParams2
    );
    
    // Validate essential parameters
    if (!destination || !departureDate) {
      logAmadeusEvent(
        LogLevel.WARNING,
        'flight-search-api',
        `Missing required parameters [${requestId}]`,
        { origin, destination, departureDate }
      );
      
      return createErrorResponse(
        'Missing required parameters: destination and departureDate are required',
        400,
        { requestId }
      );
    }
    
    // Call the Amadeus API through our wrapper function
    const flightData = await searchFlights(searchParams2);
    
    // Log successful results
    logAmadeusEvent(
      LogLevel.INFO,
      'flight-search-api',
      `Search completed [${requestId}]: Found ${flightData?.length || 0} flights`,
      { resultCount: flightData?.length || 0 }
    );
    
    return NextResponse.json(flightData);
  } catch (error) {
    // Use our error handler
    const errorDetails = handleAmadeusError(
      error,
      'flight-search-api',
      { requestId, url: request.url }
    );
    
    return createErrorResponse(
      errorDetails.error,
      errorDetails.status,
      { ...errorDetails.details, requestId }
    );
  }
} 