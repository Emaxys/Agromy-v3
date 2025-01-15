import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchResults } from './SearchResults';
import { Product } from '../../types';
import { products } from '../../data/products';

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setIsResultsVisible(true);
    } else {
      setSearchResults([]);
      setIsResultsVisible(false);
    }
  }, [searchQuery]);

  return (
    <div className="bg-purple-50 dark:bg-purple-900/10 py-2 mt-14">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative" ref={searchRef}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsResultsVisible(true)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       transition-all duration-300"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg flex items-center gap-2 transition-colors">
              <Search size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
          
          <SearchResults
            results={searchResults}
            isVisible={isResultsVisible}
            onClose={() => setIsResultsVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};