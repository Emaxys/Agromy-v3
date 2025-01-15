import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCard } from './CategoryCard';
import { products } from '../../data/products';

// Get unique categories
const categories = Array.from(new Set(products.map(product => product.category)));

export const CategorySection = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Shop by Category
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category}
              category={category}
              products={products.filter(p => p.category === category)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};