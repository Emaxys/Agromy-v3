import React, { useState } from 'react';
import { CategoryTabs } from '../components/categories/CategoryTabs';
import { ProductGrid } from '../components/products/ProductGrid';
import { products } from '../data/products';

export const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <CategoryTabs selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};