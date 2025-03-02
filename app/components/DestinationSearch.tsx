'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Available destinations that we have built
const availableDestinations = [
  { id: 'europe', name: 'Europe', path: '/destinations/europe' },
  { id: 'americas', name: 'Americas', path: '/destinations/americas' },
  // These can be added later when built
  // { id: 'asia', name: 'Asia', path: '/destinations/asia' },
  // { id: 'africa', name: 'Africa', path: '/destinations/africa' },
  // { id: 'oceania', name: 'Oceania', path: '/destinations/oceania' },
];

export function DestinationSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<typeof availableDestinations>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Simple search implementation
    const filteredResults = availableDestinations.filter(destination => 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filteredResults);
    setIsSearching(true);
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    setResults([]);
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Search destinations..."
            aria-label="Search destinations"
          />
          <Button 
            type="submit" 
            variant="ghost" 
            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 p-2"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>

      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {results.map(destination => (
                <li key={destination.id}>
                  <button
                    onClick={() => handleResultClick(destination.path)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center"
                  >
                    <span>{destination.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No destinations found. Try a different search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
} 