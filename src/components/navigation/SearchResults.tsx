import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../types';
import { formatNaira } from '../../utils/currency';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
  results: Product[];
  isVisible: boolean;
  onClose: () => void;
}

export const SearchResults = ({ results, isVisible, onClose }: SearchResultsProps) => {
  if (!isVisible || results.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
      >
        {results.map((product) => (
          <Link
            key={product.id}
            to={`/categories?product=${product.id}`}
            onClick={onClose}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-purple-600 dark:text-purple-400">
                {formatNaira(product.price)}
              </p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};