import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

const superDeals: Product[] = [
  {
    id: 20,
    name: "Premium Rice Bundle",
    price: 15000,
    category: "Food items",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "Special discount on premium rice bundle"
  },
  {
    id: 21,
    name: "Organic Honey Pack",
    price: 8000,
    category: "Food items",
    image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38",
    description: "Buy 2 get 1 free organic honey pack"
  },
  {
    id: 22,
    name: "Fresh Fruits Basket",
    price: 12000,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
    description: "Seasonal fruits basket at 30% off"
  }
];

export const SuperDeals = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Zap className="text-yellow-600 dark:text-yellow-400" size={24} />
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            Super Deals
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {superDeals.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};