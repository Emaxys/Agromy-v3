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
        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {results.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="flex gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-4 w-full"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    {formatNaira(product.price)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {product.category}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};