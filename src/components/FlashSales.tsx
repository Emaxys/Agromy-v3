import React from 'react';
import { Clock } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

const flashSaleProducts: Product[] = [
  {
    id: 7,
    name: "Premium Rice Bundle",
    price: 19.99,
    category: "Food items",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    description: "High-quality rice bundle, limited time offer"
  },
  {
    id: 8,
    name: "Organic Honey",
    price: 9.99,
    category: "Food items",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    description: "Pure organic honey from local farms"
  }
];

export const FlashSales = () => {
  return (
    <section className="bg-purple-100 dark:bg-pink-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="text-purple-600 dark:text-pink-400" size={24} />
          <h2 className="text-2xl font-bold text-purple-600 dark:text-pink-400">
            Flash Sales
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};