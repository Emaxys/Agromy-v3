import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { SearchResults } from './SearchResults';
import { Product } from '../../types';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
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
    if (value.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setIsResultsVisible(true);
    } else {
      setSearchResults([]);
      setIsResultsVisible(false);
    }
  }, [value]);

  return (
    <div className="relative flex-1" ref={searchRef}>
      <motion.div
        initial={false}
        animate={{ scale: isResultsVisible ? 1.02 : 1 }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.trim() && setIsResultsVisible(true)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   transition-all duration-300"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </motion.div>
      
      <SearchResults
        results={searchResults}
        isVisible={isResultsVisible}
        onClose={() => setIsResultsVisible(false)}
      />
    </div>
  );
};