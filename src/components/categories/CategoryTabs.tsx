import React from 'react';

const categories = [
  'All',
  'Cooking oil',
  'Food items',
  'Spices',
  'Food ingredients',
  'Seafood',
  'Meat',
  'Fruits'
];

interface CategoryTabsProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onSelect }: CategoryTabsProps) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-4 min-w-max pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};