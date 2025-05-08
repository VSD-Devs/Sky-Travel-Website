'use client';

import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Clock, CreditCard } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EnhancedFilterPanelProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  durationRange: [number, number];
  onDurationRangeChange: (range: [number, number]) => void;
  airlines: string[];
  selectedAirlines: string[];
  onAirlineChange: (airline: string, selected: boolean) => void;
  maxStops: number;
  onMaxStopsChange: (stops: number) => void;
  directOnly: boolean;
  onDirectOnlyChange: (direct: boolean) => void;
  onReset: () => void;
}

export default function EnhancedFilterPanel({
  priceRange,
  onPriceRangeChange,
  durationRange,
  onDurationRangeChange,
  airlines,
  selectedAirlines,
  onAirlineChange,
  maxStops,
  onMaxStopsChange,
  directOnly,
  onDirectOnlyChange,
  onReset
}: EnhancedFilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    duration: true,
    stops: true,
    airlines: true
  });
  
  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Toggle section expanded state
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Results
        </h2>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onReset}
          className="text-blue-600 hover:text-blue-800"
        >
          Reset All
        </Button>
      </div>
      
      {/* Price Range */}
      <Collapsible 
        open={expandedSections.price} 
        onOpenChange={() => toggleSection('price')}
        className="mb-4 border-b pb-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
              <h3 className="text-sm font-medium">Price Range</h3>
            </div>
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-3">
          <div className="px-2">
            <Slider
              defaultValue={priceRange}
              min={priceRange[0]}
              max={priceRange[1]}
              step={10}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              className="my-6"
            />
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span>to</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Flight Duration */}
      <Collapsible 
        open={expandedSections.duration} 
        onOpenChange={() => toggleSection('duration')}
        className="mb-4 border-b pb-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              <h3 className="text-sm font-medium">Flight Duration</h3>
            </div>
            {expandedSections.duration ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-3">
          <div className="px-2">
            <Slider
              defaultValue={durationRange}
              min={durationRange[0]}
              max={durationRange[1]}
              step={15}
              value={[durationRange[0], durationRange[1]]}
              onValueChange={(value) => onDurationRangeChange(value as [number, number])}
              className="my-6"
            />
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{formatDuration(durationRange[0])}</span>
              <span>to</span>
              <span>{formatDuration(durationRange[1])}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Stops */}
      <Collapsible 
        open={expandedSections.stops} 
        onOpenChange={() => toggleSection('stops')}
        className="mb-4 border-b pb-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12h-8m-10 0h6" />
                <circle cx="13" cy="12" r="2" />
                <circle cx="5" cy="12" r="2" />
              </svg>
              <h3 className="text-sm font-medium">Stops</h3>
            </div>
            {expandedSections.stops ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm flex items-center">
                Direct flights only
              </label>
              <Switch 
                checked={directOnly}
                onCheckedChange={onDirectOnlyChange}
              />
            </div>
            
            {!directOnly && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Maximum stops</p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((stops) => (
                    <Button
                      key={stops}
                      variant={maxStops === stops ? "default" : "outline"}
                      size="sm"
                      onClick={() => onMaxStopsChange(stops)}
                      className="flex-1"
                    >
                      {stops === 0 ? 'Direct' : stops === 1 ? '1 Stop' : '2+ Stops'}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Airlines */}
      <Collapsible 
        open={expandedSections.airlines} 
        onOpenChange={() => toggleSection('airlines')}
        className="mb-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a1 1 0 01-1.1 1 11.94 11.94 0 01-5.2-1.5 11.95 11.95 0 01-3.7-2.7 11.95 11.95 0 01-2.7-3.7 11.94 11.94 0 01-1.5-5.2 1 1 0 01.99-1.1h3a1 1 0 01.99.73c.07.35.14.7.25 1.05a1 1 0 01-.22 1l-1.14 1.14a16.35 16.35 0 006.6 6.6l1.14-1.14a1 1 0 011-.22c.35.11.7.18 1.05.25.43.07.73.5.73.99z" />
                <path d="M14 4.5l-5.5 5.5m0-5.5L14 10" />
              </svg>
              <h3 className="text-sm font-medium">Airlines</h3>
            </div>
            {expandedSections.airlines ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-3">
          {selectedAirlines.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {selectedAirlines.map(airline => (
                <Badge key={airline} variant="secondary" className="gap-1">
                  {airline}
                  <button 
                    onClick={() => onAirlineChange(airline, false)}
                    className="ml-1 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedAirlines.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => selectedAirlines.forEach(a => onAirlineChange(a, false))}
                >
                  Clear
                </Button>
              )}
            </div>
          )}
          
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {airlines.map(airline => (
              <div key={airline} className="flex items-center">
                <input
                  type="checkbox"
                  id={`airline-${airline}`}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  checked={selectedAirlines.includes(airline)}
                  onChange={(e) => onAirlineChange(airline, e.target.checked)}
                />
                <label htmlFor={`airline-${airline}`} className="ml-2 text-sm">
                  {airline}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
} 