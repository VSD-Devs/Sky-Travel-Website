'use client';

import { useState } from 'react';
import { 
  ArrowRight,
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CreditCard, 
  Luggage, 
  Plane
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { getAirportByCode, getFormattedLocation } from '@/data/airports';
import { FlightOffer } from '@/lib/amadeus';

interface EnhancedFlightCardProps {
  flight: FlightOffer;
  detailed?: boolean;
  getAirlineName: (code: string) => string;
}

export default function EnhancedFlightCard({ 
  flight, 
  detailed = false,
  getAirlineName
}: EnhancedFlightCardProps) {
  const [expanded, setExpanded] = useState(detailed);
  const router = useRouter();
  
  // Format time with hours and minutes
  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Format date in a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      weekday: 'short'
    });
  };
  
  // Format duration from PT format
  const formatDuration = (duration: string) => {
    if (!duration) return '';
    return duration
      .replace('PT', '')
      .replace('H', 'h ')
      .replace('M', 'm');
  };
  
  // Calculate stops label
  const getStopsLabel = (segments: any[]) => {
    const numStops = segments.length - 1;
    if (numStops === 0) return 'Direct';
    return `${numStops} ${numStops === 1 ? 'stop' : 'stops'}`;
  };
  
  // Get connection time between segments
  const calculateConnectionTime = (arrivalTime: string, departureTime: string) => {
    const arrive = new Date(arrivalTime);
    const depart = new Date(departureTime);
    const diffMs = depart.getTime() - arrive.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    
    return hours > 0 
      ? `${hours}h ${mins}m`
      : `${mins}m`;
  };
  
  // Handle book button click
  const handleBookClick = () => {
    router.push(`/flights/${flight.id}`);
  };
  
  // Get departure, arrival, and journey info for the first (outbound) segment
  const outbound = flight.itineraries[0];
  const outboundDeparture = outbound.segments[0].departure;
  const outboundArrival = outbound.segments[outbound.segments.length - 1].arrival;
  
  // Check if this is a return flight
  const hasReturn = flight.itineraries.length > 1;
  
  // Get return journey info if it exists
  let returnDeparture, returnArrival;
  if (hasReturn) {
    const returnJourney = flight.itineraries[1];
    returnDeparture = returnJourney.segments[0].departure;
    returnArrival = returnJourney.segments[returnJourney.segments.length - 1].arrival;
  }
  
  // Get carrier info from the first segment
  const mainCarrier = outbound.segments[0].carrierCode;
  const mainCarrierName = getAirlineName(mainCarrier);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Main flight information (always visible) */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-lg font-bold text-blue-700">{mainCarrierName}</div>
            <Badge variant="outline" className="ml-2">{mainCarrier}</Badge>
          </div>
          
          <div className="text-xl font-bold">
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: flight.price.currency || 'GBP'
            }).format(parseFloat(flight.price.total))}
          </div>
        </div>
        
        {/* Outbound flight summary */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Departure */}
          <div>
            <div className="text-lg font-bold">{formatTime(outboundDeparture.at)}</div>
            <div className="text-sm text-gray-600">{outboundDeparture.iataCode}</div>
            <div className="text-xs text-gray-500">{formatDate(outboundDeparture.at)}</div>
          </div>
          
          {/* Flight info */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs text-gray-500 mb-1">{formatDuration(outbound.duration)}</div>
            <div className="w-full flex items-center">
              <div className="h-0.5 flex-grow bg-gray-300"></div>
              <Plane className="mx-1 h-4 w-4 text-blue-600" />
              <div className="h-0.5 flex-grow bg-gray-300"></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getStopsLabel(outbound.segments)}
            </div>
          </div>
          
          {/* Arrival */}
          <div className="text-right">
            <div className="text-lg font-bold">{formatTime(outboundArrival.at)}</div>
            <div className="text-sm text-gray-600">{outboundArrival.iataCode}</div>
            <div className="text-xs text-gray-500">{formatDate(outboundArrival.at)}</div>
          </div>
        </div>
        
        {/* Return flight summary (if applicable) */}
        {hasReturn && (
          <>
            <Separator className="my-3" />
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {/* Departure */}
              <div>
                <div className="text-lg font-bold">{formatTime(returnDeparture.at)}</div>
                <div className="text-sm text-gray-600">{returnDeparture.iataCode}</div>
                <div className="text-xs text-gray-500">{formatDate(returnDeparture.at)}</div>
              </div>
              
              {/* Flight info */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-xs text-gray-500 mb-1">{formatDuration(flight.itineraries[1].duration)}</div>
                <div className="w-full flex items-center">
                  <div className="h-0.5 flex-grow bg-gray-300"></div>
                  <Plane className="mx-1 h-4 w-4 text-blue-600 transform rotate-180" />
                  <div className="h-0.5 flex-grow bg-gray-300"></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getStopsLabel(flight.itineraries[1].segments)}
                </div>
              </div>
              
              {/* Arrival */}
              <div className="text-right">
                <div className="text-lg font-bold">{formatTime(returnArrival.at)}</div>
                <div className="text-sm text-gray-600">{returnArrival.iataCode}</div>
                <div className="text-xs text-gray-500">{formatDate(returnArrival.at)}</div>
              </div>
            </div>
          </>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-blue-600"
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Show details
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleBookClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Select
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Expanded details */}
      {expanded && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          {/* Detailed itinerary for each segment */}
          <div className="space-y-6">
            {flight.itineraries.map((itinerary, itineraryIndex) => (
              <div key={itineraryIndex}>
                <h3 className="font-semibold mb-2">
                  {itineraryIndex === 0 ? 'Outbound' : 'Return'} Journey
                </h3>
                
                {itinerary.segments.map((segment, segmentIndex) => (
                  <div key={segmentIndex} className="mb-4">
                    {/* Connection time between segments */}
                    {segmentIndex > 0 && (
                      <div className="flex items-center justify-center py-2 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Connection time: {calculateConnectionTime(
                          itinerary.segments[segmentIndex - 1].arrival.at,
                          segment.departure.at
                        )}</span>
                      </div>
                    )}
                    
                    <div className="bg-white p-3 rounded border border-gray-200">
                      {/* Airline info */}
                      <div className="flex items-center mb-2">
                        <Plane className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="font-medium">{getAirlineName(segment.carrierCode)}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          Flight {segment.carrierCode}{segment.number}
                        </span>
                      </div>
                      
                      {/* Segment details */}
                      <div className="grid grid-cols-7 gap-2">
                        {/* Departure */}
                        <div className="col-span-3">
                          <div className="text-lg font-bold">{formatTime(segment.departure.at)}</div>
                          <div className="text-sm">
                            {segment.departure.iataCode}
                            {segment.departure.terminal && (
                              <span className="text-xs ml-1">Terminal {segment.departure.terminal}</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(segment.departure.at)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getFormattedLocation(segment.departure.iataCode)}
                          </div>
                        </div>
                        
                        {/* Duration */}
                        <div className="col-span-1 flex flex-col items-center justify-center">
                          <div className="text-xs text-gray-500 mb-1">{formatDuration(segment.duration)}</div>
                          <div className="w-full flex items-center">
                            <div className="h-0.5 flex-grow bg-gray-300"></div>
                            <ArrowRight className="mx-1 h-3 w-3 text-gray-400" />
                            <div className="h-0.5 flex-grow bg-gray-300"></div>
                          </div>
                        </div>
                        
                        {/* Arrival */}
                        <div className="col-span-3 text-right">
                          <div className="text-lg font-bold">{formatTime(segment.arrival.at)}</div>
                          <div className="text-sm">
                            {segment.arrival.iataCode}
                            {segment.arrival.terminal && (
                              <span className="text-xs ml-1">Terminal {segment.arrival.terminal}</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(segment.arrival.at)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getFormattedLocation(segment.arrival.iataCode)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Price details */}
          <div className="bg-white p-3 rounded border border-gray-200 mt-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-blue-600" />
              Price Details
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base fare</span>
                <span>
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: flight.price.currency || 'GBP'
                  }).format(parseFloat(flight.price.base || '0'))}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Taxes and fees</span>
                <span>
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: flight.price.currency || 'GBP'
                  }).format(
                    parseFloat(flight.price.total) - parseFloat(flight.price.base || '0')
                  )}
                </span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-bold">
                <span>Total price</span>
                <span>
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: flight.price.currency || 'GBP'
                  }).format(parseFloat(flight.price.total))}
                </span>
              </div>
            </div>
          </div>
          
          {/* Baggage info */}
          <div className="bg-white p-3 rounded border border-gray-200 mt-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <Luggage className="mr-2 h-4 w-4 text-blue-600" />
              Baggage Information
            </h3>
            <p className="text-sm text-gray-600">
              Baggage allowance details will be confirmed during the booking process.
              Standard allowance varies by airline and fare class.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 