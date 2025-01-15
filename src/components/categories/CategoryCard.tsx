import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface CategoryCardProps {
  category: string;
  products: Product[];
  index: number;
}

export const CategoryCard = ({ category, products, index }: CategoryCardProps) => {
  const featuredProduct = products[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={featuredProduct.image}
          alt={category}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-xl font-semibold mb-1">{category}</h3>
            <p className="text-sm">{products.length} products</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Link
          to={`/categories?category=${encodeURIComponent(category)}`}
          className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
        >
          View All
        </Link>
      </div>
    </motion.div>
  );
};