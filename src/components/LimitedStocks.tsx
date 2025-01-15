import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { formatNaira } from '../utils/currency';

const limitedStockProducts = [
  {
    id: 13,
    name: "Premium Palm Oil",
    price: 15000,
    category: "Cooking oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    description: "High-quality red palm oil, limited stock available",
    stockLeft: 5
  },
  {
    id: 14,
    name: "Organic Honey",
    price: 12000,
    category: "Food items",
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38",
    description: "Pure organic honey from local farms",
    stockLeft: 3
  }
];

export const LimitedStocks = () => {
  return (
    <section className="bg-red-50 dark:bg-red-900/20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Limited Stock Items
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limitedStockProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <ProductCard product={product} />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  Only {product.stockLeft} left!
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};